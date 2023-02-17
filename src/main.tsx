import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import { Provider } from "react-redux";

import "./index.css";
import "./scss/index.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./i18n";

import { App } from "./App";
import { toggleMode } from "./utils/DarkModeToggle";

toggleMode();

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
