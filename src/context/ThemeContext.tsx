// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define our theme types
export type ThemeOption = "tech-forward" | "finance-tech" | "bold-innovation";
export type ColorMode = "dark" | "light";

// Define the shape of our context
interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  colorMode: ColorMode;
  toggleColorMode: () => void;
  themeOptions: Array<{
    value: ThemeOption;
    label: string;
    color: string;
  }>;
}

// Theme options with readable labels and representative colors
const defaultThemeOptions = [
  {
    value: "tech-forward" as ThemeOption,
    label: "Tech-Forward",
    color: "#3b82f6",
  },
  {
    value: "finance-tech" as ThemeOption,
    label: "Finance-Tech",
    color: "#0f766e",
  },
  {
    value: "bold-innovation" as ThemeOption,
    label: "Bold Innovation",
    color: "#d946ef",
  },
];

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: "tech-forward",
  setTheme: () => {},
  colorMode: "dark",
  toggleColorMode: () => {},
  themeOptions: defaultThemeOptions,
});

// Export a custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// The theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOption>("tech-forward");
  const [colorMode, setColorMode] = useState<ColorMode>("dark");

  // Toggle between dark and light color modes
  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Apply the theme to the document whenever it changes
  useEffect(() => {
    // Remove any previous theme and color mode
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-color-mode");

    // Add the appropriate data attributes
    if (theme !== "tech-forward") {
      document.documentElement.setAttribute("data-theme", theme);
    }

    document.documentElement.setAttribute("data-color-mode", colorMode);

    // Save preferences to localStorage for persistence
    localStorage.setItem("preferred-theme", theme);
    localStorage.setItem("preferred-color-mode", colorMode);
  }, [theme, colorMode]);

  // On mount, check if there's a saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "preferred-theme"
    ) as ThemeOption | null;
    const savedColorMode = localStorage.getItem(
      "preferred-color-mode"
    ) as ColorMode | null;

    if (
      savedTheme &&
      defaultThemeOptions.some((option) => option.value === savedTheme)
    ) {
      setTheme(savedTheme);
    }

    if (
      savedColorMode &&
      (savedColorMode === "dark" || savedColorMode === "light")
    ) {
      setColorMode(savedColorMode);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorMode,
        toggleColorMode,
        themeOptions: defaultThemeOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
