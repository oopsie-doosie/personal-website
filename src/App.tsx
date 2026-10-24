// src/App.tsx
import {
  Navbar,
  Hero,
  Experience,
  Projects,
  Toolkit,
  About,
  Contact,
  Footer,
} from "@/components/index";
import { useSpotlight } from "@/hooks/useSpotlight";

function App() {
  useSpotlight();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-fg px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Ambient backdrop: drifting aurora, film grain, scroll progress */}
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Toolkit />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
