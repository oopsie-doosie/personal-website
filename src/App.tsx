// src/App.tsx

import { useEffect } from "react";
// import About from "./components/sections/About/About";
// import Experience from "./components/sections/Experience/Experience";
// import Projects from "./components/sections/Projects/Projects";
// import Skills from "./components/sections/Skills/Skills";
// import Interests from "./components/sections/Interests/Interests";
// import Contact from "./components/sections/Contact/Contact";
// import Footer from "./components/layout/Footer";

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
    <div className="min-h-screen bg-slate-900 text-white">
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
