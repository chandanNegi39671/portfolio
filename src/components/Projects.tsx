import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import { projects, type Project } from "../data/content";
import GitHubStats from "./GitHubStats";

const accentMap = {
  signal: { text: "text-signal", border: "hover:border-signal/50", glow: "bg-signal/10" },
  plasma: { text: "text-plasma", border: "hover:border-plasma/50", glow: "bg-plasma/10" },
  ember: { text: "text-ember", border: "hover:border-ember/50", glow: "bg-ember/10" },
};

function HFBadge({ repoId }: { repoId: string }) {
  const [stats, setStats] = useState<{ likes: number; downloads: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://huggingface.co/api/models/${repoId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!cancelled) setStats({ likes: d.likes ?? 0, downloads: d.downloads ?? 0 });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repoId]);

  if (!stats) return null;

  return (
    <div className="mt-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
      <span className="flex items-center gap-1.5 text-signal">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
        </span>
        Live from HuggingFace
      </span>
      <span>{stats.downloads.toLocaleString()} downloads</span>
      <span>{stats.likes} likes</span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = accentMap[project.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`glass relative overflow-hidden rounded-3xl border border-line/60 transition-colors ${accent.border}`}
    >
      <div className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full ${accent.glow} blur-3xl`} />

      <div className="relative p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className={`font-display text-4xl font-bold ${accent.text} sm:text-5xl`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className={`font-mono text-xs uppercase tracking-wider ${accent.text}`}>
                {project.tag}
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-signal hover:text-signal"
              aria-label={`${project.name} on GitHub`}
            >
              <Github size={16} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-signal hover:text-signal"
                aria-label={`${project.name} live demo`}
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Problem</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Solution</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.solution}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 border-y border-line/60 py-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-xl text-ink sm:text-2xl">{m.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-ink-dim"
            >
              {s}
            </span>
          ))}
        </div>

        {project.github.includes("huggingface.co/") && (
          <HFBadge repoId={project.github.split("huggingface.co/")[1]} />
        )}

        <button
          onClick={() => setOpen(!open)}
          className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:text-signal"
        >
          Architecture
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {project.architecture.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-dim">
                  <span className={`font-mono text-xs ${accent.text}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">03 — Work</p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Featured projects
      </h2>
      <p className="mt-4 max-w-xl text-ink-dim">
        Four systems, four different failure modes solved — perception, reasoning,
        trust, and real-time constraints.
      </p>

      <div className="mt-14">
        <GitHubStats />
      </div>

      <div className="grid gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
