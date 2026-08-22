import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Check } from "lucide-react";
import { profile } from "../data/content";

const links = [
  {
    label: "GitHub",
    href: profile.github,
    icon: Github,
    handle: "chandanNegi39671",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
    handle: "chandan-singh-3967ramola",
  },
  {
    label: "HuggingFace",
    href: profile.huggingface,
    icon: ExternalLink,
    handle: "negi3961",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      // Only swallow the default navigation once we've actually copied
      e.preventDefault();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — let the mailto link navigate as a fallback
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/5 blur-[120px]" />

      <div className="relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
            <span className="text-ink-faint">07</span> — Contact
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Let's build something
            <br />
            <span className="text-gradient">that ships.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-dim">
            Open to internships, collaborations, and conversations about
            production-grade AI/ML systems, computer vision, or anything that
            involves getting a model out of a notebook and into the real world.
          </p>
        </motion.div>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              onClick={copyEmail}
              title="Click to copy"
              className="group flex items-center gap-4 text-ink-dim transition-colors hover:text-signal"
            >
              <div className="glass flex h-10 w-10 items-center justify-center rounded-full">
                <Mail size={16} />
              </div>
              <span className="flex items-center gap-2 font-mono text-xs break-all sm:text-sm">
                {copied ? "Copied to clipboard!" : profile.email}
                {copied ? (
                  <Check size={14} className="text-signal" />
                ) : (
                  <span className="hidden text-[10px] uppercase tracking-wider text-ink-faint group-hover:inline">
                    copy
                  </span>
                )}
              </span>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="group flex items-center gap-4 text-ink-dim transition-colors hover:text-signal"
            >
              <div className="glass flex h-10 w-10 items-center justify-center rounded-full">
                <Phone size={16} />
              </div>
              <span className="font-mono text-xs sm:text-sm">{profile.phone}</span>
            </a>

            <div className="flex items-center gap-4 text-ink-faint">
              <div className="glass flex h-10 w-10 items-center justify-center rounded-full">
                <MapPin size={16} />
              </div>
              <span className="font-mono text-xs sm:text-sm">{profile.location}</span>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                aria-label={l.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-dim transition-colors hover:border-signal/50 hover:text-signal"
              >
                <l.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* right — quick-fire links card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
            Quick links
          </p>

          <div className="mt-8 space-y-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-line/60 px-5 py-4 transition-colors hover:border-signal/40 hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  <l.icon size={16} className="text-ink-faint group-hover:text-signal" />
                  <span className="font-display text-sm text-ink">{l.label}</span>
                </div>
                <span className="font-mono text-xs text-ink-faint group-hover:text-signal">
                  {l.handle} →
                </span>
              </a>
            ))}

            <a
              href={profile.resumeFile}
              download
              className="group mt-2 flex items-center justify-between rounded-xl border border-signal/30 bg-signal/5 px-5 py-4 transition-colors hover:border-signal/60 hover:bg-signal/10"
            >
              <span className="font-display text-sm text-signal">Download Résumé</span>
              <span className="font-mono text-xs text-signal/70 group-hover:text-signal">
                PDF →
              </span>
            </a>
          </div>

          <p className="mt-8 text-center font-mono text-xs text-ink-faint">
            Response time: usually &lt; 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
