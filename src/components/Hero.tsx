import { motion } from "framer-motion";
import { ArrowDown, Download, Github } from "lucide-react";
import NeuralCore from "./three/NeuralCore";
import profileImg from "../assets/profile.png";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-plasma/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-signal"
          >
            AI / ML Engineer &middot; Noida, India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display leading-[0.95] tracking-tight"
          >
            <span className="block text-3xl text-ink-dim sm:text-4xl">Hello, I'm</span>
            <span className="text-gradient block text-6xl sm:text-7xl lg:text-8xl">
              Chandan Singh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-xl text-ink sm:text-2xl"
          >
            Machine Learning Engineer
            <br />
            <span className="text-ink-dim">I train models that ship, not just demo.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg"
          >
            {profile.tagline} Currently a B.Tech CSE student building production
            computer vision, NLP, and full-stack AI systems for the AMD AI
            Hackathon circuit and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(94,234,212,0.35)]"
            >
              View projects
            </a>
            <a
              href={profile.resumeFile}
              download
              className="flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal"
            >
              <Download size={14} /> Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-ink-dim transition-colors hover:text-signal"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex gap-10 font-mono text-xs uppercase tracking-wider text-ink-faint"
          >
            <div>
              <p className="font-display text-2xl text-ink">83%</p>
              <p>mAP · NikaAI</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">95%+</p>
              <p>accuracy · TRINETRA</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">29K</p>
              <p>images trained</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[440px]"
        >
          <div className="absolute inset-0">
            <NeuralCore />
          </div>
          <div className="animate-float-slow absolute inset-0 flex items-center justify-center">
            <div className="glass relative h-56 w-56 overflow-hidden rounded-3xl shadow-2xl sm:h-64 sm:w-64">
              <img
                src={profileImg}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-signal"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
