// src/App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createCitizen } from "./data/citizens"; // 👈 фабрика для генерации граждан
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
  CircularProgress, // 👈 добавили лоадер
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 260;

function App() {
  const [mode, setMode] = useState("light");

  // стейт с гражданами
  const [citizens, setCitizens] = useState(() =>
    Array.from({ length: 200 }, (_, i) => createCitizen(i + 1))
  );

  // стейт загрузки
  const [loading, setLoading] = useState(false);

const worker = new Worker(
  new URL("./workers/citizenWorker.js", import.meta.url),
  { type: "module" } 
);
  // переключение данных
  const toggleDataset = () => {
  setLoading(true);
  const newSize = citizens.length === 200 ? 100000 : 200;
  worker.postMessage({ size: newSize });

  worker.onmessage = (e) => {
    setCitizens(e.data);
    setLoading(false);
  };
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
                onClick={() =>
                  setMode((m) => (m === "light" ? "dark" : "light"))
                }
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
                <ListItem
                  sx={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={toggleDataset}
                    disabled={loading}
                  >
                    {citizens.length === 200
                      ? "Загрузить 100 000"
                      : "Вернуть 200"}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={22}
                      sx={{ mt: 1, alignSelf: "center" }}
                    />
                  )}
                </ListItem>
              </List>
            </Box>
          </Drawer>

          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard citizens={citizens} />} />
              <Route
                path="/dashboard"
                element={<Dashboard citizens={citizens} />}
              />
              <Route
                path="/catalog"
                element={<Catalog citizens={citizens} />}
              />
              <Route
                path="/catalog/:id"
                element={<CitizenCard citizens={citizens} />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
