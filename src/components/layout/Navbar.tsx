// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../data";
import { ColorModeToggle, ThemePicker } from "..";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Home", target: "home" },
    { name: "About", target: "about" },
    { name: "Experience", target: "experience" },
    { name: "Projects", target: "projects" },
    { name: "Skills", target: "skills" },
    { name: "Interests", target: "interests" },
    { name: "Contact", target: "contact" },
  ];

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? "bg-primary-background/90 backdrop-blur-md py-2 md:py-3 shadow-lg"
          : "bg-transparent py-3 md:py-6"
      }`}
    >
      <div className="w-full max-w-[1400px] px-4 mx-auto flex justify-between items-center">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-xl font-bold text-primary-accent cursor-pointer truncate max-w-[150px] sm:max-w-none whitespace-nowrap"
        >
          {isMobile ? personalInfo.shortName : personalInfo.name}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-6 lg:space-x-8 mr-6">
            {navItems.map((item) => (
              <Link
                key={item.target}
                to={item.target}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="cursor-pointer hover:text-primary-accent transition-colors"
                activeClass="text-primary-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme controls */}
          <div className="flex items-center space-x-4">
            <ColorModeToggle />
            <ThemePicker />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          {/* Theme controls for mobile - more compact */}
          <div className="flex items-center space-x-2 mr-2">
            <ColorModeToggle />
            <ThemePicker />
          </div>

          <button
            className="text-text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary-background shadow-lg"
          >
            <div className="w-full max-w-[1400px] px-4 mx-auto py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.target}
                    to={item.target}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="cursor-pointer hover:text-primary-accent transition-colors py-2"
                    activeClass="text-primary-accent"
                    onClick={handleMobileNavClick}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
