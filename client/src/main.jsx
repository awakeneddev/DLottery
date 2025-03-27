
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BlockChainProvider } from "./context/blockchainContext.jsx";
import { IsConnectedProvider } from "./context/isConnectedContext.jsx";
import "./index.css";
import router from "./routes/routes.jsx";
import { BrowserProvider } from "./context/browserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IsConnectedProvider>
      <BlockChainProvider>
        <BrowserProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" /></BrowserProvider>
      </BlockChainProvider>
    </IsConnectedProvider>
  </StrictMode>
);
