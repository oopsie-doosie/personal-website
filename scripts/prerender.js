// scripts/prerender.js
// Runs after `vite build` and `vite build --ssr`: renders the app into
// dist/index.html, injects JSON-LD structured data, and writes dist/llms.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist/index.html");
const serverEntry = path.join(root, "dist-ssr/entry-server.js");

const { render, structuredData, llmsTxt } = await import(
  pathToFileURL(serverEntry).href
);

const replaceOnce = (html, search, replacement) => {
  if (!html.includes(search)) {
    throw new Error(`prerender: "${search}" not found in ${indexPath}`);
  }
  return html.replace(search, () => replacement);
};

// Escape "<" so the JSON can never close the surrounding <script> tag
const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

let html = fs.readFileSync(indexPath, "utf-8");
html = replaceOnce(html, '<div id="root"></div>', `<div id="root">${render()}</div>`);
html = replaceOnce(
  html,
  "</head>",
  `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`
);

fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join(root, "dist/llms.txt"), llmsTxt);

console.log("prerender: wrote dist/index.html and dist/llms.txt");
