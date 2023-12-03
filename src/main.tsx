import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { ToastContextProvider } from "./context/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </React.StrictMode>
);
