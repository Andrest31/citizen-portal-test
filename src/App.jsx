import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createCitizen } from "./data/citizens";
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
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 220;
const OVERRIDES_KEY = "citizen_overrides_v1";

function applyOverrides(citizensArr, overrides) {
  if (!overrides || Object.keys(overrides).length === 0) return citizensArr;
  const map = {};
  for (const c of citizensArr) {
    map[String(c.id)] = c;
  }
  const result = [...citizensArr];
  for (const [k, val] of Object.entries(overrides)) {
    if (map[k]) {
      result[result.findIndex((r) => String(r.id) === k)] = { ...map[k], ...val };
    } else {
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

  const [citizens, setCitizens] = useState(() => {
    const base = Array.from({ length: 200 }, (_, i) => createCitizen(i + 1));
    return applyOverrides(base, readOverrides());
  });

  const [loading, setLoading] = useState(false);
  const [datasetSize, setDatasetSize] = useState(200);

  const workerRef = useMemo(() => {
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
      const applied = applyOverrides(e.data, readOverrides());
      setCitizens(applied);
      setLoading(false);
    };
    workerRef.addEventListener("message", onMessage);
    return () => workerRef.removeEventListener("message", onMessage);
  }, [workerRef]);

  const handleDatasetChange = (event) => {
    const newSize = event.target.value;
    setDatasetSize(newSize);
    if (!workerRef) {
      setLoading(true);
      setTimeout(() => {
        const arr = Array.from({ length: newSize }, (_, i) => createCitizen(i + 1));
        const applied = applyOverrides(arr, readOverrides());
        setCitizens(applied);
        setLoading(false);
      }, 60);
      return;
    }
    setLoading(true);
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
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Размер выборки
                  </Typography>
                  <Select
                    value={datasetSize}
                    onChange={handleDatasetChange}
                    size="small"
                    fullWidth
                    disabled={loading}
                  >
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={5000}>5 000</MenuItem>
                    <MenuItem value={100000}>100 000</MenuItem>
                  </Select>
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
              <Route
                path="/catalog/:id"
                element={<CitizenCard citizens={citizens} setCitizens={setCitizens} />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
