import ParticleField from "./components/ParticleField";
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

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-void text-ink">
      <ParticleField />

      <div className="relative z-10">
        <Nav />

        <main>
          <Hero />

          {/* subtle divider */}
          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>

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
    </div>
  );
}
