// src/main.tsx
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Self-hosted fonts (preloaded by scripts/prerender.js)
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import App from "./App.tsx";
import { SiteThemeProvider } from "./theme/SiteThemeProvider";
import { readInitialTheme } from "./theme/siteTheme";

const container = document.getElementById("root")!;
const initialTheme = readInitialTheme();
const app = (
  <StrictMode>
    <SiteThemeProvider initialTheme={initialTheme}>
      <App />
    </SiteThemeProvider>
  </StrictMode>
);

// Production HTML is prerendered as the modern edition (see
// scripts/prerender.js); the dev server is not, and the retro edition replaces it
if (container.hasChildNodes() && initialTheme === "modern") {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
