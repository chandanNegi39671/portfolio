import { useEffect, useState } from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { profile } from "../data/content";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "HuggingFace", href: profile.huggingface, icon: ExternalLink },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let id = 0;
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

    const start = () => {
      tick();
      id = window.setInterval(tick, 1000);
    };
    const stop = () => window.clearInterval(id);

    // Only tick while the tab is visible
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return time;
}

export default function Footer() {
  const time = useLocalTime();

  return (
    <footer className="relative border-t border-line/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* brand */}
          <div>
            <a href="#hero" className="font-display text-lg tracking-tight text-ink">
              CS<span className="text-signal">.</span>
            </a>
            <p className="mt-1 font-mono text-xs text-ink-dim">
              AI/ML Engineer · Noida, India
            </p>
            {time && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                Local time {time} IST
              </p>
            )}
          </div>

          {/* nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs uppercase tracking-wider text-ink-dim transition-colors hover:text-signal"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* socials */}
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="text-ink-dim transition-colors hover:text-signal"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-line/40 pt-6 text-center">
          <p className="font-mono text-xs text-ink-dim">
            © {new Date().getFullYear()} Chandan Singh · Built with React, Vite &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}