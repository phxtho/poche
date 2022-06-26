import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "@/styles/tailwind.css";
import "./index.css";
import App from "@/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
