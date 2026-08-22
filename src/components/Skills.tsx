import { motion } from "framer-motion";
import { skills } from "../data/content";
import SectionHeading from "./SectionHeading";

const groups = [
  { title: "Languages", items: skills.languages },
  { title: "AI / ML Frameworks", items: skills.frameworks },
  { title: "Backend & Cloud", items: skills.backend },
  { title: "Full-Stack & Data", items: skills.fullstack },
  { title: "Concepts", items: skills.concepts },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" eyebrow="Stack" title={<>What&apos;s under the hood</>} />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass group relative overflow-hidden rounded-2xl border border-line/60 p-6 transition-colors hover:border-signal/50"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-signal/70 transition-all group-hover:w-1.5" />
            <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
              {g.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-dim transition-colors group-hover:border-signal/40 group-hover:text-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
