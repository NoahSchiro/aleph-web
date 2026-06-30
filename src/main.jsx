import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.jsx";

const nord = {
  nord0: "#2E3440", nord1: "#3B4252", nord2: "#434C5E", nord3: "#4C566A",
  nord4: "#D8DEE9", nord5: "#E5E9F0", nord6: "#ECEFF4",
  nord7: "#8FBCBB", nord8: "#88C0D0", nord9: "#81A1C1", nord10: "#5E81AC",
  nord11: "#BF616A", nord12: "#D08770", nord13: "#EBCB8B", nord14: "#A3BE8C", nord15: "#B48EAD",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: nord.nord8, contrastText: nord.nord0 },
    secondary:  { main: nord.nord15 },
    error:      { main: nord.nord11 },
    warning:    { main: nord.nord13 },
    success:    { main: nord.nord14 },
    background: { default: nord.nord0, paper: nord.nord1 },
    text:       { primary: nord.nord6, secondary: nord.nord4 },
    divider:    nord.nord3,
  },
  typography: {
    fontFamily: "'Noto Sans Mono', monospace",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
