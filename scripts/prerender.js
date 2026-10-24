// scripts/prerender.js
// Runs after `vite build` and `vite build --ssr`: renders the app into
// dist/index.html, inlines CSS, preloads the above-the-fold fonts, injects JSON-LD
// structured data, and writes dist/llms.txt.
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

// Fonts used in the hero, so they download alongside the first paint
const fontPatterns = [
  /^geist-latin-wght-normal-.*\.woff2$/,
  /^geist-mono-latin-wght-normal-.*\.woff2$/,
  /^instrument-serif-latin-400-italic-.*\.woff2$/,
];
const assets = fs.readdirSync(path.join(root, "dist/assets"));
const fontPreloads = fontPatterns
  .map((pattern) => {
    const file = assets.find((name) => pattern.test(name));
    if (!file) throw new Error(`prerender: no font file matching ${pattern}`);
    return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
  })
  .join("\n    ");

// Escape "<" so the JSON can never close the surrounding <script> tag
const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

let html = fs.readFileSync(indexPath, "utf-8");
// This single-page site has a small stylesheet. Inline it to avoid a blocking
// network round trip, keeping Vite's absolute /assets/ font URLs intact.
const stylesheet = html.match(/<link rel="stylesheet" href="\/assets\/([^"/]+\.css)">/);
if (!stylesheet) throw new Error("prerender: expected Vite's stylesheet link");
const css = fs.readFileSync(path.join(root, "dist/assets", stylesheet[1]), "utf-8");
html = replaceOnce(html, stylesheet[0], `${fontPreloads}\n    <style>${css}</style>`);

// Keep Cloudflare from rewriting our public email links and injecting its
// decoder. Put the opt-out comments outside React's hydration root.
html = replaceOnce(
  html,
  '<div id="root"></div>',
  `<!--email_off--><div id="root">${render()}</div><!--/email_off-->`
);
html = replaceOnce(
  html,
  "</head>",
  `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`
);

fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join(root, "dist/llms.txt"), llmsTxt);

console.log("prerender: wrote dist/index.html and dist/llms.txt");
