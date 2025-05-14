/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // DaisyUI config (optional)
  daisyui: {
    themes: ["light", "dark"], // You can add more themes or create custom ones
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
  },
};
