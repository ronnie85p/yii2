import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
// import './index.css'

const root = document.getElementById("todo");
if (root) {
  ReactDOM.createRoot(root).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
}
