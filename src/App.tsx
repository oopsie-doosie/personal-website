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



function App() {
  // Add smooth scrolling effect
  useEffect(() => {
    // You can add any global effects here
  }, []);

  return (
    <div className="min-h-screen bg-primary-background text-text-primary relative">

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
