import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { AppThemeProvider } from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <CssBaseline />
      <App />
    </AppThemeProvider>
  </React.StrictMode>,
);
