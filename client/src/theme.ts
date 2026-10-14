import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "#f7f7f5",
      paper: "#ffffff",
    },

    text: {
      primary: "#161616",
      secondary: "#6e6e73",
    },

    divider: "#e5e5e5",

    primary: {
      main: "#161616",
    },
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

    h1: {
      fontWeight: 600,
      letterSpacing: "-0.04em",
    },

    h2: {
      fontWeight: 600,
      letterSpacing: "-0.03em",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});

export default theme;