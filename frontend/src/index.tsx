import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
