import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./lib/theme-provider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="al-maal-theme">
    <App />
  </ThemeProvider>
);
