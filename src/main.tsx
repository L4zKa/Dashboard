import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { FluentProvider } from "@fluentui/react-components";

createRoot(document.getElementById("root")!).render(
  <FluentProvider
    style={{
      background: "transparent",
    }}
  >
    <App />
  </FluentProvider>
);
