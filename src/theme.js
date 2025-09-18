// theme.js
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e", // темно-синий с фиолетовым оттенком
      contrastText: "#fff",
    },
    secondary: {
      main: "#5e35b1", // акцент — фиолетовый
    },
    background: {
      default: "#f4f6f8", // общий фон (светло-серый)
      paper: "#ffffff",   // фон карточек
    },
    text: {
      primary: "#212121",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.8rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.2rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1a237e 0%, #5e35b1 100%)",
        },
      },
    },
  },
});

export default theme;
