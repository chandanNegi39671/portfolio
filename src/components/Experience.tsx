import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { experience, quote } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="04"
        eyebrow="Process"
        title={<>Experience &amp; hackathons</>}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Numbered timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line/70 sm:left-[27px]" aria-hidden />
          <div className="space-y-10">
            {experience.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-signal bg-void font-display text-sm font-bold text-signal sm:h-14 sm:w-14 sm:text-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="glass flex-1 rounded-2xl border border-line/60 p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl text-ink">{e.title}</h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-signal">
                      {e.period}
                    </p>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
                    {e.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pull quote panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-signal-dim to-signal p-8 text-void"
        >
          <Quote size={36} className="fill-void/20 text-void/20" />
          <p className="mt-6 font-display text-2xl font-semibold leading-snug">
            {quote.text}
          </p>
          <div className="mt-8">
            <p className="font-display text-lg italic">{quote.signature}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-void/70">
              Let's build something reliable together
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
