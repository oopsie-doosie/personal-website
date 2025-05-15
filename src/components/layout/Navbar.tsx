// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../data";
import { ColorModeToggle, ThemePicker } from "..";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

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

  // Handle screen resize and set initial window width
  useEffect(() => {
    // Function to update window width
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width (important for SSR)
    if (typeof window !== "undefined") {
      updateWindowDimensions();
    }

    // Add event listener
    window.addEventListener("resize", updateWindowDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowDimensions);
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

  // Determine if on mobile
  const isMobile = windowWidth > 0 && windowWidth < 768;

  // Use short name on very small screens
  const displayName =
    windowWidth < 400 ? personalInfo.shortName : personalInfo.name;

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-background/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: isScrolled ? "0.5rem" : "0.75rem",
        paddingBottom: isScrolled ? "0.5rem" : "0.75rem",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-xl font-bold text-primary-accent cursor-pointer truncate"
          style={{ maxWidth: isMobile ? "120px" : "none" }}
        >
          {displayName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-4 lg:space-x-6 mr-4">
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
          <div
            className="flex items-center"
            style={{ gap: "0.375rem", marginRight: "0.375rem" }}
          >
            <ColorModeToggle />
            <ThemePicker />
          </div>

          <button
            className="text-text-primary focus:outline-none ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{ marginLeft: "0.25rem" }}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-5 w-5"
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
                className="h-5 w-5"
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
            <div className="w-full max-w-6xl mx-auto px-4 py-4">
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
    </header>
  );
};

export default Navbar;
