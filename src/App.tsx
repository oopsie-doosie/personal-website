// src/App.tsx
import { useEffect } from "react";

import {
  Navbar,
  Hero,
  Footer,
  About,
  Experience,
  Projects,
  Skills,
  Interests,
  Contact,
} from "@/components/index";

import GlobalBackground3D from "@/components/3d/GlobalBackground3D";
import RevealOnScroll from "@/components/effects/RevealOnScroll";

function App() {
  // Add smooth scrolling effect
  useEffect(() => {
    // You can add any global effects here
  }, []);

  return (
    <div className="min-h-screen bg-primary-background text-text-primary relative">
      <GlobalBackground3D />
      <Navbar />
      <main>
        <RevealOnScroll>
          <Hero />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <About />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Experience />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Projects />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Skills />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Interests />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <Contact />
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
}

export default App;
