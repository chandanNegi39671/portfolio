import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { research } from "../data/content";

export default function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">06 — Notes</p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Research &amp; writing
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {research.map((r, i) => (
          <motion.a
            key={r.title}
            href="#"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass group flex flex-col justify-between rounded-2xl p-7 transition-colors hover:border-signal/40"
          >
            <div>
              <h3 className="font-display text-lg text-ink">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{r.excerpt}</p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors group-hover:text-signal">
              Coming soon <ArrowUpRight size={14} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
