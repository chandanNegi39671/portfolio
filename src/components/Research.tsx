import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { research, type ResearchPost } from "../data/content";
import Modal from "./Modal";

export default function Research() {
  const [active, setActive] = useState<ResearchPost | null>(null);

  return (
    <section id="research" className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">06 — Notes</p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Research &amp; writing
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {research.map((r, i) => (
          <motion.button
            key={r.title}
            onClick={() => setActive(r)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass group flex flex-col justify-between rounded-2xl p-7 text-left transition-colors hover:border-signal/40"
          >
            <div>
              <h3 className="font-display text-lg text-ink">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{r.excerpt}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                <Clock size={12} /> {r.readTime}
              </span>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors group-hover:text-signal">
                Read <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
      >
        {active && (
          <div className="space-y-4">
            <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-signal">
              <Clock size={12} /> {active.readTime}
            </p>
            {active.body.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-dim">
                {para}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
}
