import { motion } from "framer-motion";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">04 — Timeline</p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Experience &amp; hackathons
      </h2>

      <div className="mt-14 space-y-0">
        {experience.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid gap-4 border-t border-line/60 py-8 sm:grid-cols-[160px_1fr] sm:gap-8"
          >
            <p className="font-mono text-sm text-ink-faint">{e.period}</p>
            <div>
              <h3 className="font-display text-xl text-ink">{e.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">{e.detail}</p>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-line/60" />
      </div>
    </section>
  );
}
