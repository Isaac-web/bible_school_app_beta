import { createTheme } from "@mui/material";
import config from "./config.json";

const theme = createTheme({
  typography: {
    color: "black",
    h4: {
      fontWeight: "bold",
      gutterButtom: true,
      color: "black",
    },
    body1: {
      color: config.colors.dark,
    },
    subtitle1: {
      color: "rgba(0, 0, 0, 0.4)",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "deepskyblue",
          boxShadow: `0 0 10px ${config.colors.light}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
        style: {
          textTransform: "capitalize",
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        margin: 0,
        padding: "0",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        fullWidth: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
  },
});

export default theme;
