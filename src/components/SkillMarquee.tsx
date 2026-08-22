import { Sparkles } from "lucide-react";
import { skills } from "../data/content";

const items = [
  ...skills.languages,
  ...skills.frameworks,
  ...skills.backend,
  ...skills.fullstack,
  ...skills.concepts,
];

export default function SkillMarquee() {
  const row = [...items, ...items];

  return (
    <div
      className="marquee-mask relative overflow-hidden border-y border-line/40 bg-surface/30 py-4"
      aria-hidden="true"
    >
      {/* Padding lives on each item (not flex gap) so the -50% loop point is seamless */}
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center whitespace-nowrap pr-10 font-mono text-xs uppercase tracking-[0.25em] text-ink-dim"
          >
            {item}
            <Sparkles size={12} className="ml-10 text-signal/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
