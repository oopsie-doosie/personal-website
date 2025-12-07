// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        // Semantic color naming that will update based on theme
        primary: {
          background: "var(--primary-background)",
          accent: "var(--primary-accent)",
        },
        secondary: {
          background: "var(--secondary-background)",
          accent: "var(--secondary-accent)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: "var(--border-color)",
        card: "var(--card-background)",
      },
      // Allow for creating gradients based on theme colors
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
        "gradient-primary-to-b":
          "linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
