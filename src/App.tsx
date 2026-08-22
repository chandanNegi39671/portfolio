import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import ParticleField from "./components/ParticleField";
import SkillMarquee from "./components/SkillMarquee";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";
import CommandPalette from "./components/CommandPalette";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-void text-ink">
      <ScrollProgress />
      <CursorGlow />
      <ParticleField />

      <div className="relative z-10">
        <Nav />

        <main>
          <Hero />
          <SkillMarquee />

          <About />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Skills />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Projects />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Experience />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Certifications />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Research />

          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

          <Contact />
        </main>

        <Footer />
      </div>

      <Terminal />
      <CommandPalette />
      <BackToTop />
    </div>
  );
}
