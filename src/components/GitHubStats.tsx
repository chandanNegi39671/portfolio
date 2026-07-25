import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Github, Star, Users } from "lucide-react";
import { profile } from "../data/content";

type GhUser = {
  public_repos: number;
  followers: number;
};

type GhRepo = {
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
};

const username = profile.github.split("/").filter(Boolean).pop() ?? "";

export default function GitHubStats() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`).then((r) =>
        r.ok ? r.json() : Promise.reject()
      ),
    ])
      .then(([u, rs]: [GhUser, GhRepo[]]) => {
        if (cancelled) return;
        setUser(u);
        setRepos(Array.isArray(rs) ? rs.slice(0, 4) : []);
        setStatus("ok");
      })
      .catch(() => !cancelled && setStatus("error"));

    return () => {
      cancelled = true;
    };
  }, []);

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  if (status === "error") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass mb-10 rounded-2xl border border-line/60 p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 font-display text-base font-semibold text-ink transition-colors hover:text-signal"
        >
          <Github size={18} />
          @{username}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
        </a>

        <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-wider text-ink-dim">
          <span className="flex items-center gap-1.5">
            <GitBranch size={13} className="text-signal" />
            {status === "loading" ? "…" : user?.public_repos ?? "—"} repos
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={13} className="text-signal" />
            {status === "loading" ? "…" : totalStars} stars
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} className="text-signal" />
            {status === "loading" ? "…" : user?.followers ?? "—"} followers
          </span>
        </div>
      </div>

      {repos.length > 0 && (
        <div className="mt-5 grid gap-2 border-t border-line/60 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {repos.map((r) => (
            <a
              key={r.name}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-line/60 px-3 py-2.5 transition-colors hover:border-signal/40"
            >
              <p className="truncate font-mono text-xs text-ink transition-colors group-hover:text-signal">
                {r.name}
              </p>
              <p className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {r.language ?? "—"}
                {r.stargazers_count > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Star size={9} /> {r.stargazers_count}
                  </span>
                )}
              </p>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
