import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { profile, skills, projects, experience, certifications } from "../data/content";

type Line = { type: "input" | "output"; text: string };

const HELP = [
  "Available commands:",
  "  whoami        — who is this",
  "  skills        — tech stack",
  "  projects      — shipped work",
  "  experience    — hackathons & research",
  "  certs         — credentials",
  "  contact       — how to reach me",
  "  sudo hire-me  — try it",
  "  clear         — clear the screen",
  "  help          — this list",
];

function run(cmdRaw: string): string[] {
  const cmd = cmdRaw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return HELP;
    case "whoami":
      return [
        `${profile.name} — ${profile.role}`,
        profile.tagline,
        `based in ${profile.location}`,
      ];
    case "skills":
      return [
        `languages   ${skills.languages.join(", ")}`,
        `frameworks  ${skills.frameworks.join(", ")}`,
        `backend     ${skills.backend.join(", ")}`,
        `fullstack   ${skills.fullstack.join(", ")}`,
        `concepts    ${skills.concepts.join(", ")}`,
      ];
    case "projects":
      return projects.map((p) => `${p.name.padEnd(22)} ${p.tag}`);
    case "experience":
      return experience.map((e) => `${e.period.padEnd(14)} ${e.title}`);
    case "certs":
    case "certifications":
      return certifications.map((c) => `${c.year.padEnd(10)} ${c.name} — ${c.issuer}`);
    case "contact":
      return [
        `email     ${profile.email}`,
        `github    ${profile.github}`,
        `linkedin  ${profile.linkedin}`,
      ];
    case "sudo hire-me":
      return ["Permission granted.", "Redirecting to contact section..."];
    case "clear":
      return ["__CLEAR__"];
    case "":
      return [];
    default:
      return [`command not found: ${cmd}`, `type 'help' for a list of commands`];
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to ${profile.name}'s terminal. Type 'help' to get started.` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = run(input);
    if (output[0] === "__CLEAR__") {
      setLines([]);
      setInput("");
      return;
    }
    setLines((prev) => [
      ...prev,
      { type: "input", text: input },
      ...output.map((text) => ({ type: "output" as const, text })),
    ]);
    if (input.trim().toLowerCase() === "sudo hire-me") {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }, 700);
    }
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        aria-label="Open terminal"
        className="glass fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink-dim shadow-lg transition-colors hover:border-signal hover:text-signal"
      >
        <TerminalSquare size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-start bg-void/70 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-line/60 bg-[#0a0d12] font-mono text-sm shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line/60 bg-surface-2 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                  <span className="h-2.5 w-2.5 rounded-full bg-signal" />
                  <span className="h-2.5 w-2.5 rounded-full bg-plasma" />
                  <span className="ml-2 text-xs text-ink-faint">guest@chandan-portfolio: ~</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-ink-faint transition-colors hover:text-signal"
                  aria-label="Close terminal"
                >
                  <X size={16} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-1.5 overflow-y-auto p-4">
                {lines.map((l, i) => (
                  <div key={i}>
                    {l.type === "input" ? (
                      <p className="text-ink">
                        <span className="text-signal">guest@portfolio</span>
                        <span className="text-ink-faint">:~$ </span>
                        {l.text}
                      </p>
                    ) : (
                      <p className="whitespace-pre-wrap text-ink-dim">{l.text}</p>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line/60 px-4 py-3">
                <span className="text-signal">guest@portfolio</span>
                <span className="text-ink-faint">:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-ink outline-none"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
