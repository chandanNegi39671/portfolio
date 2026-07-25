import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import profileImg from "../assets/profile-cutout.png";
import { profile } from "../data/content";

const stats = [
  { value: "3+", label: "Years learning & building" },
  { value: "10+", label: "AI projects shipped" },
  { value: "95%+", label: "Peak model accuracy" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24"
    >
      {/* Giant background word */}
      <div className="pointer-events-none absolute inset-x-0 top-36 -z-10 select-none overflow-hidden sm:top-40">
        <p className="text-gradient whitespace-nowrap text-center font-display text-[22vw] font-bold leading-none tracking-tighter opacity-20 sm:text-[19vw]">
          PORTFOLIO
        </p>
      </div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-void via-void/95 to-void" />
      <div className="absolute left-1/2 top-1/4 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />

      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-3 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-3 rounded-full border border-signal/40 bg-signal/10 px-4 py-2 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-signal sm:text-base">
              AI / ML Engineer
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-dim">
              Production-grade builder
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ember shadow-[0_0_30px_rgba(251,146,60,0.15)] sm:text-xs"
        >
          <Sparkles size={14} className="animate-pulse-glow text-ember" />
          Open to hackathons &amp; internships
        </motion.div>
      </div>

      {/* Main hero content */}
      <div className="relative mx-auto mt-10 grid w-full max-w-6xl flex-1 grid-cols-1 items-end gap-10 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl italic text-ink-dim"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl"
          >
            Chandan
            <br />
            Singh
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 font-display text-lg font-semibold uppercase tracking-wide text-signal"
          >
            Machine Learning Engineer &amp; AI Builder
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-ink-dim sm:text-base"
          >
            {profile.tagline} Currently a B.Tech CSE student shipping
            production computer vision, NLP, and full-stack AI systems for
            the AMD AI Hackathon circuit and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-wider text-void transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
            >
              View projects <ArrowRight size={14} />
            </a>
            <a
              href={profile.resumeFile}
              download
              className="flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal"
            >
              <Download size={14} /> Resume
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint"
          >
            <span className="h-2 w-2 rounded-full bg-signal" />
            Based in Noida, India &middot; available worldwide (remote)
          </motion.p>
        </div>

        {/* Photo + stats */}
        <div className="relative flex items-end justify-center gap-6 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[4/5] w-full max-w-[360px]"
          >
            <div
              className="absolute inset-0 rounded-full bg-signal/15 blur-[100px]"
              aria-hidden
            />
            <img
              src={profileImg}
              alt={profile.name}
              className="relative h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 78%, transparent 98%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 78%, transparent 98%)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden flex-col gap-6 pb-4 sm:flex"
          >
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-signal/50 pl-4">
                <p className="font-display text-3xl font-bold text-ink">{s.value}</p>
                <p className="max-w-[8rem] font-mono text-[11px] uppercase leading-snug tracking-wider text-ink-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-signal"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>
    </section>
  );
}