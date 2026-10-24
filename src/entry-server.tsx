// src/entry-server.tsx
// Build-time entry used by scripts/prerender.js to render the page to static
// HTML, so search engines and AI crawlers can read it without running JS.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";

export { structuredData, llmsTxt } from "./seo";

export const render = () =>
  renderToString(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
