import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { mockCitizens } from "./data/citizens";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import CitizenCard from "./pages/CitizenCard";

import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Верхняя панель */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Портал учета граждан
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Боковое меню */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/catalog">
                <ListItemText primary="Картотека" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Контент */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard citizens={mockCitizens} />}
            />
            <Route
              path="/catalog"
              element={<Catalog citizens={mockCitizens} />}
            />
            <Route
              path="/catalog/:id"
              element={<CitizenCard citizens={mockCitizens} />}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
