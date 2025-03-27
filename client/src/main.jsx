import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ConnectionProvider } from "./context/context.jsx";
import "./index.css";
import router from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConnectionProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </ConnectionProvider>
  </StrictMode>
);
