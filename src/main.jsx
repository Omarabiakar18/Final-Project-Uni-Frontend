import React from "react";
import ReactDOM from "react-dom/client";
import "./User.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Pinwheel } from "@uiball/loaders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
