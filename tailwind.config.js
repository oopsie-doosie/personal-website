// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Each font is followed by a size-matched fallback (see index.css) so
      // text doesn't reflow when the web font finishes loading
      fontFamily: {
        sans: ['"Geist Variable"', '"Geist Fallback"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ['"Instrument Serif"', '"Instrument Serif Fallback"', "ui-serif", "Georgia", "serif"],
      },
      // Design tokens are defined as RGB channels in src/index.css
      colors: {
        ink: token("ink"),
        "ink-2": token("ink-2"),
        fg: token("fg"),
        muted: token("muted"),
        faint: token("faint"),
        violet: token("violet"),
        cyan: token("cyan"),
        mint: token("mint"),
        amber: token("amber"),
      },
    },
  },
  plugins: [],
};
