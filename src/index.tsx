import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/tailwind.css";
import "./index.css";
import App from "@/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
createRoot(container!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
