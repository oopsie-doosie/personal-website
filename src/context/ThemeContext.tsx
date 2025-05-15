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

// Define the shape of our context
interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  themeOptions: Array<{
    value: ThemeOption;
    label: string;
  }>;
}

// Default theme options with readable labels
// TODO: make a type for that
const defaultThemeOptions: Array<{ value: ThemeOption; label: string }> = [
  { value: "tech-forward", label: "Tech-Forward Dark" },
  { value: "finance-tech", label: "Finance-Tech Hybrid" },
  { value: "bold-innovation", label: "Bold Innovation" },
];

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: "tech-forward",
  setTheme: () => {},
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

  // Apply the theme to the document whenever it changes
  useEffect(() => {
    // Remove any previous theme
    document.documentElement.removeAttribute("data-theme");

    // Skip adding attribute for default theme to keep CSS clean
    if (theme !== "tech-forward") {
      document.documentElement.setAttribute("data-theme", theme);
    }

    // Optionally save the theme preference to localStorage for persistence
    localStorage.setItem("preferred-theme", theme);
  }, [theme]);

  // On mount, check if there's a saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "preferred-theme"
    ) as ThemeOption | null;
    if (
      savedTheme &&
      defaultThemeOptions.some((option) => option.value === savedTheme)
    ) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeOptions: defaultThemeOptions }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
