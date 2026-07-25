import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Code2,
  Boxes,
  Briefcase,
  Award,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  FileText,
  CornerDownLeft,
} from "lucide-react";
import { profile } from "../data/content";

type Item = {
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items: Item[] = useMemo(
    () => [
      { label: "About", hint: "Section", icon: <User size={15} />, action: () => scrollTo("about") },
      { label: "Skills", hint: "Section", icon: <Code2 size={15} />, action: () => scrollTo("skills") },
      { label: "Projects", hint: "Section", icon: <Boxes size={15} />, action: () => scrollTo("projects") },
      { label: "Experience", hint: "Section", icon: <Briefcase size={15} />, action: () => scrollTo("experience") },
      { label: "Certifications", hint: "Section", icon: <Award size={15} />, action: () => scrollTo("certifications") },
      { label: "Research & Writing", hint: "Section", icon: <BookOpen size={15} />, action: () => scrollTo("research") },
      { label: "Contact", hint: "Section", icon: <Mail size={15} />, action: () => scrollTo("contact") },
      {
        label: "Open GitHub",
        hint: "External",
        icon: <Github size={15} />,
        action: () => window.open(profile.github, "_blank"),
      },
      {
        label: "Open LinkedIn",
        hint: "External",
        icon: <Linkedin size={15} />,
        action: () => window.open(profile.linkedin, "_blank"),
      },
      {
        label: "Download Resume",
        hint: "File",
        icon: <FileText size={15} />,
        action: () => window.open(profile.resumeFile, "_blank"),
      },
    ],
    []
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) {
        item.action();
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-xs text-ink-dim shadow-lg transition-colors hover:border-signal hover:text-signal sm:flex"
        aria-label="Open command palette"
      >
        <Search size={14} />
        Quick nav
        <kbd className="ml-1 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[110] flex items-start justify-center bg-void/80 p-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg overflow-hidden rounded-2xl border border-line/60 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line/60 px-4 py-3.5">
                <Search size={16} className="text-ink-faint" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Jump to a section or link..."
                  className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">ESC</kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-ink-faint">No matches</p>
                )}
                {filtered.map((item, i) => (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      item.action();
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === activeIndex ? "bg-signal/10 text-ink" : "text-ink-dim"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={i === activeIndex ? "text-signal" : "text-ink-faint"}>
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                      {item.hint}
                      {i === activeIndex && <CornerDownLeft size={12} />}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
