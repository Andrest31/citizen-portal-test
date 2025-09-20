import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createCitizen } from "./data/citizens"; // фабрика для генерации граждан
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import CitizenCard from "./pages/CitizenCard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 220;

const OVERRIDES_KEY = "citizen_overrides_v1";

function applyOverrides(citizensArr, overrides) {
  if (!overrides || Object.keys(overrides).length === 0) return citizensArr;
  // формируем map по id для быстрого доступа
  const map = {};
  for (const c of citizensArr) {
    map[String(c.id)] = c;
  }
  // применяем overrides: если нет оригинала (редкий случай), всё равно добавим override как отдельную запись
  const result = [...citizensArr];
  for (const [k, val] of Object.entries(overrides)) {
    if (map[k]) {
      // заменяем существующую запись
      result[result.findIndex((r) => String(r.id) === k)] = { ...map[k], ...val };
    } else {
      // добавляем новый объект (редко)
      result.push(val);
    }
  }
  return result;
}

function readOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Ошибка чтения overrides:", e);
    return {};
  }
}

export default function App() {
  const [mode, setMode] = useState("light");

  // начальная генерация данных (200) — но применяем overrides из localStorage
  const [citizens, setCitizens] = useState(() => {
    const base = Array.from({ length: 200 }, (_, i) => createCitizen(i + 1));
    const overrides = readOverrides();
    return applyOverrides(base, overrides);
  });

  const [loading, setLoading] = useState(false);

  // Web Worker для генерации больших наборов
  const workerRef = useMemo(() => {
    // создаём воркер динамически: если сборка не поддерживает new Worker(new URL(...)) — оставляем null
    try {
      return new Worker(new URL("./workers/citizenWorker.js", import.meta.url), { type: "module" });
    } catch (e) {
      console.warn("Worker не создан — возможно сборщик не поддерживает new Worker(URL).", e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!workerRef) return;
    const onMessage = (e) => {
      // получаем массив и применяем overrides
      const overrides = readOverrides();
      const applied = applyOverrides(e.data, overrides);
      setCitizens(applied);
      setLoading(false);
    };
    workerRef.addEventListener("message", onMessage);
    return () => {
      workerRef.removeEventListener("message", onMessage);
    };
  }, [workerRef]);

  // переключение между 200 и 100000 (генерация через воркер)
  const toggleDataset = () => {
    if (!workerRef) {
      // если воркеры недоступны — делаем синхронную генерацию (в фоне UI може "подвиснуть")
      setLoading(true);
      setTimeout(() => {
        const newSize = citizens.length === 200 ? 100000 : 200;
        const arr = Array.from({ length: newSize }, (_, i) => createCitizen(i + 1));
        const applied = applyOverrides(arr, readOverrides());
        setCitizens(applied);
        setLoading(false);
      }, 60);
      return;
    }

    setLoading(true);
    const newSize = citizens.length === 200 ? 100000 : 200;
    workerRef.postMessage({ size: newSize });
  };

  return (
    <ThemeProvider theme={theme(mode)}>
      <Router>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Портал учета граждан — Аналитика
              </Typography>
              <IconButton
                color="inherit"
                sx={{ ml: "auto" }}
                onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
                aria-label="toggle theme"
              >
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                borderRight: "1px solid rgba(0,0,0,0.06)",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto", p: 2 }}>
              <List>
                <ListItem button component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/catalog">
                  <ListItemText primary="Картотека" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem>
                  <ListItemText
                    primary={`Граждан: ${citizens.length.toLocaleString()}`}
                    secondary="Данные сгенерированы"
                  />
                </ListItem>
                <ListItem sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                  <Button variant="outlined" size="small" fullWidth onClick={toggleDataset} disabled={loading}>
                    {citizens.length === 200 ? "Загрузить 100 000" : "Вернуть 200"}
                  </Button>
                  {loading && <CircularProgress size={22} sx={{ mt: 1, alignSelf: "center" }} />}
                </ListItem>
              </List>
            </Box>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard citizens={citizens} />} />
              <Route path="/dashboard" element={<Dashboard citizens={citizens} />} />
              <Route path="/catalog" element={<Catalog citizens={citizens} />} />
              <Route path="/catalog/:id" element={<CitizenCard citizens={citizens} setCitizens={setCitizens} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
