import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";
// import { fetchBooks } from "./features/books/slice/BookSlice";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// store.dispatch(fetchBooks());

function Main() {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
    // </React.StrictMode>
  );
}

root.render(<Main />);
