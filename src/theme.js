import { createTheme } from "@mui/material";

const theme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1a237e", contrastText: "#fff" },
      secondary: { main: "#5e35b1" },
      background: {
        default: mode === "light" ? "#f4f6f8" : "#0f1720",
        paper: mode === "light" ? "#fff" : "#0b1220",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#e6eef8",
      },
    },
    typography: {
      fontFamily: '"Inter","Roboto",Arial,sans-serif',
      h4: { fontWeight: 700, fontSize: "1.6rem" },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(11,15,30,0.06)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(90deg,#1a237e 0%, #5e35b1 100%)",
          },
        },
      },
    },
  });

export default theme;
