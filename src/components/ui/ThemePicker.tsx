// src/components/ui/ThemePicker.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme, themeOptions } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => setIsOpen(!isOpen);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
    setIsOpen(false);
  };

  // Get the current theme's color
  const currentThemeColor =
    themeOptions.find((option) => option.value === theme)?.color || "#3b82f6";

  return (
    <div className="relative">
      <motion.button
        onClick={togglePicker}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: currentThemeColor }}
        />
        <span className="text-xs text-text-secondary hidden md:block">
          Theme
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-2 bg-card rounded-lg shadow-lg border border-border z-50 min-w-[150px]"
          >
            {themeOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`flex items-center space-x-2 w-full text-left p-2 rounded-md ${
                  theme === option.value
                    ? "bg-primary-accent/20"
                    : "hover:bg-secondary-background"
                }`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-sm">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
