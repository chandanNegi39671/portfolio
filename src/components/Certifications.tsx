import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "../data/content";

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">05 — Credentials</p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Certifications
      </h2>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <Award size={20} className="text-signal" />
            <h3 className="mt-4 font-display text-base text-ink">{c.name}</h3>
            <p className="mt-2 font-mono text-xs text-ink-faint">{c.issuer}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">{c.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
