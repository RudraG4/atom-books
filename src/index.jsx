import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./store/store";
import { fetchBooks } from "./features/books/slice/BookSlice";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Montserrat",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#2751bf",
    },
    secondary: {
      main: "#6b6b6b",
    },
    text: {
      primary: "#000000de",
      secondary: "#465b75",
    },
  },
});

store.dispatch(fetchBooks());

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}

root.render(<Main />);
