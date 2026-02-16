import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { AuthProvider } from "./authContex.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Routese from "./Routese.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <Routese/>
    </Router>
  </AuthProvider>
);
