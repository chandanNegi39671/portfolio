import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export default function SectionHeading({ index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
        <span className="text-ink-faint">{index}</span> — {eyebrow}
      </p>
      <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-xl text-ink-dim">{subtitle}</p>}
    </motion.header>
  );
}
