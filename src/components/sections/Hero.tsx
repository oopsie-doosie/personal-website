// src/components/sections/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { personalInfo } from "../../data";

const Hero = () => {
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for a premium feel
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(79, 70, 229, 0.4)",
      transition: {
        duration: 0.3,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-text-primary">Hi, I'm </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-secondary-accent">
            {personalInfo.shortName}
          </span>
        </motion.h1>

        <motion.h2
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-5xl text-text-secondary mb-8 font-light tracking-wide"
        >
          {personalInfo.title}
        </motion.h2>

        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-text-tertiary max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Building innovative solutions at Goldman Sachs and developing
          cutting-edge AI analytics tools for hedge funds.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          className="flex justify-center"
        >
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-accent to-secondary-accent text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-primary-accent/50 transition-all duration-300 overflow-hidden cursor-pointer outline-none focus:outline-none focus:ring-0"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
