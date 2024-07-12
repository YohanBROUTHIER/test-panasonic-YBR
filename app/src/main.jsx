import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import ThemeProvider from "./services/theme.jsx";
import router from "./services/router.jsx";

// Ratache l'application a la div qui a pour id "root".
// Nous englobons le router de multiple context qui transmette
// des données a tout les enfants.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    <ToastContainer />
  </React.StrictMode>
);	