// src/components/sections/Hero/Hero.tsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { personalInfo } from "../../../data";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP animation for the background
  useEffect(() => {
    if (!heroRef.current) return;

    const particles = heroRef.current.querySelectorAll(".particle");

    particles.forEach((particle) => {
      gsap.to(particle, {
        x: `random(-20, 20)`,
        y: `random(-20, 20)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  // Generate particles for the background
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div
          key={i}
          className={`particle absolute rounded-full bg-blue-${Math.floor(
            Math.random() * 5 + 4
          )}00 opacity-${Math.floor(Math.random() * 3 + 1)}0 w-${Math.floor(
            Math.random() * 3 + 1
          )} h-${Math.floor(Math.random() * 3 + 1)}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      );
    }
    return particles;
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#2563EB", // blue-600
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background with particles and gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {renderParticles()}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-blue-500">{personalInfo.name}</span>
        </motion.h1>

        <motion.h2
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl text-slate-300 mb-8"
        >
          {personalInfo.title}
        </motion.h2>

        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Building innovative solutions at Goldman Sachs and developing
          cutting-edge AI analytics tools for hedge funds.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="inline-block"
        >
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-8 py-3 rounded-md cursor-pointer inline-block"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
