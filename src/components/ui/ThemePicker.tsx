// src/components/ui/ThemePicker.tsx
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme, themeOptions } = useTheme();

  // Function to cycle to the next theme
  const cycleToNextTheme = () => {
    // Find current theme index
    const currentIndex = themeOptions.findIndex(
      (option) => option.value === theme
    );
    // Calculate next theme index (wrap around to 0 if at the end)
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    // Set the next theme
    setTheme(themeOptions[nextIndex].value as any);
  };

  // Get the current theme's color
  const currentThemeColor =
    themeOptions.find((option) => option.value === theme)?.color || "#3b82f6";

  return (
    <motion.button
      onClick={cycleToNextTheme}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Change theme"
    >
      <span
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: currentThemeColor }}
      />
      <span className="text-xs text-text-secondary hidden md:block">Theme</span>
    </motion.button>
  );
};

export default ThemePicker;
