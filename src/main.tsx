// src/main.tsx
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./styles/themes.css"; // Import our theme variables
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext"; // Import our ThemeProvider

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Production HTML is prerendered (see scripts/prerender.js); the dev server is not
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
