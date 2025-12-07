// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../data";
import { ColorModeToggle, ThemePicker } from "..";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(true); // Start with scrolled state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const initialRenderRef = useRef(true);

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

  // One-time initialization effect to set correct scroll state
  useEffect(() => {
    if (initialRenderRef.current) {
      // Force compact navbar on first render
      setIsScrolled(true);

      // After a very short delay, check actual scroll position
      const timer = setTimeout(() => {
        if (window.scrollY <= 50) {
          setIsScrolled(false);
        }
        initialRenderRef.current = false;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle scroll effect (after initial render)
  useEffect(() => {
    const handleScroll = () => {
      if (initialRenderRef.current) return;

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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-primary-background/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-4 flex justify-between items-center">
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-xl font-bold text-primary-accent cursor-pointer truncate max-w-[150px] sm:max-w-none"
        >
          <span className="md:hidden">{personalInfo.shortName}</span>
          <span className="hidden md:inline">{personalInfo.name}</span>
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

        {/* Mobile Navigation Toggle - Fixed Right Aligned */}
        <div
          className="md:hidden flex items-center justify-end"
          style={{ minWidth: "80px" }}
        >
          {/* Theme controls for mobile - more compact */}
          <ColorModeToggle />
          <div className="w-2"></div>
          <ThemePicker />
          <div className="w-2"></div>

          <button
            className="text-text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
    </nav>
  );
};

export default Navbar;
