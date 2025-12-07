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
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
