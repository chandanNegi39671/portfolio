import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { certifications, learningLog } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" eyebrow="Credentials" title="Certifications" />

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {certifications.map((c, i) => {
          const Wrapper = c.url ? motion.a : motion.div;
          return (
            <Wrapper
              key={c.name}
              {...(c.url
                ? { href: c.url, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass group relative rounded-2xl border border-line/60 p-6 transition-colors hover:border-signal/50"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/15 text-signal transition-colors group-hover:bg-signal group-hover:text-void">
                  <Award size={20} />
                </span>
                {c.url && (
                  <ExternalLink
                    size={16}
                    className="text-ink-faint transition-colors group-hover:text-signal"
                  />
                )}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">
                {c.name}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-faint">
                {c.issuer}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-signal">
                {c.year}
              </p>
            </Wrapper>
          );
        })}
      </div>

      {/* Continuous learning trail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass mt-6 rounded-2xl border border-line/60 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Currently deepening fundamentals
            </p>
            <a
              href={learningLog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 font-display text-lg font-semibold text-ink transition-colors hover:text-signal"
            >
              {learningLog.title}
              <ExternalLink size={14} className="text-signal" />
            </a>
          </div>
          <span className="rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
            {learningLog.modules.length}/{learningLog.modules.length} modules complete
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {learningLog.modules.map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-dim transition-colors hover:border-signal/50 hover:text-ink"
            >
              <CheckCircle2 size={12} className="text-signal" />
              {m}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
