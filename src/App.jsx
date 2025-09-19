import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { mockCitizens } from "./data/citizens";
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
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 260;

function App() {
  const [mode, setMode] = useState("light");

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
                    primary={`Граждан: ${mockCitizens.length.toLocaleString()}`}
                    secondary="Данные сгенерированы"
                  />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard citizens={mockCitizens} />} />
              <Route path="/dashboard" element={<Dashboard citizens={mockCitizens} />} />
              <Route path="/catalog" element={<Catalog citizens={mockCitizens} />} />
              <Route path="/catalog/:id" element={<CitizenCard citizens={mockCitizens} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;