import { motion } from "framer-motion";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">01 — About</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Engineer first,
            <br /> ML practitioner always.
          </h2>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-lg leading-relaxed text-ink-dim"
          >
            {about.summary}
          </motion.p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.points.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <p className="font-display text-sm text-signal">{p.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
