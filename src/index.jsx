import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
