// src/components/ui/ThemeSelector.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme, themeOptions } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as any;
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="hidden md:inline text-text-secondary text-sm">
        Theme:
      </span>
      <select
        value={theme}
        onChange={handleThemeChange}
        className="select select-sm bg-secondary-background text-text-primary border-border focus:outline-none focus:border-primary-accent transition-colors"
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
