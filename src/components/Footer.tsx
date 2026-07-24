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

export default function Footer() {
  return (
    <footer className="relative border-t border-line/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* brand */}
          <div>
            <a href="#hero" className="font-display text-lg tracking-tight text-ink">
              CS<span className="text-signal">.</span>
            </a>
            <p className="mt-1 font-mono text-xs text-ink-faint">
              AI/ML Engineer · Noida, India
            </p>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:text-signal"
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
                className="text-ink-faint transition-colors hover:text-signal"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-line/40 pt-6 text-center">
          <p className="font-mono text-xs text-ink-faint">
            © {new Date().getFullYear()} Chandan Singh · Built with React, Vite &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
