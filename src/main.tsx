// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/themes.css"; // Import our theme variables
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext"; // Import our ThemeProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
