"use client";

import type { Planet } from "@/lib/planets";
import { Icon } from "../Atomic/Icon";

export function PlanetCard({
  planet,
  open,
  onToggle,
}: {
  planet: Planet;
  open: boolean;
  onToggle: () => void;
}) {
  const { content } = planet;

  return (
    <section
      id={content.id}
      className="scroll-mt-20 rounded-2xl border border-white/10 bg-black p-5 backdrop-blur"
      style={{ boxShadow: `0 0 40px -22px ${content.accent}` }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full touch-manipulation items-center gap-3 text-left"
      >
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg"
          style={{
            background: `${content.accent}22`,
            border: `1px solid ${content.accent}55`,
            color: content.accent,
          }}
          aria-hidden
        >
          <Icon name={content.icon}/>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-white">{content.headline}</span>
          <span className="block text-sm text-white/60">{content.summary}</span>
        </span>
        <span
          className="ml-auto text-sm transition-transform"
          style={{ color: content.accent, transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {planet.body && (
            <p className="text-sm leading-relaxed text-white/80">{planet.body}</p>
          )}

          {planet.projects?.map((p) => (
            <article key={p.title} className="rounded-lg bg-white/3 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-medium text-white">{p.title}</h3>
                {p.year && <span className="text-xs text-white/40">{p.year}</span>}
              </div>
              <p className="mt-1 text-sm text-white/70">{p.description}</p>
              <p className="mt-2 text-xs text-white/50">{p.stack.join(" · ")}</p>
              <div className="mt-2 flex gap-4 text-xs">
                {p.href && (
                  <a href={p.href} className="underline" style={{ color: content.accent }}>
                    Démo
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} className="underline" style={{ color: content.accent }}>
                    Code
                  </a>
                )}
              </div>
            </article>
          ))}

          {planet.experiences?.map((e) => (
            <article
              key={e.role + e.org}
              className="border-l-2 pl-3"
              style={{ borderColor: content.accent }}
            >
              <h3 className="font-medium text-white">
                {e.role} — {e.org}
              </h3>
              <p className="text-xs text-white/40">{e.period}</p>
              <p className="mt-1 text-sm text-white/70">{e.description}</p>
            </article>
          ))}

          {planet.skills?.map((g) => (
            <div key={g.group}>
              <h3 className="text-sm font-medium text-white/80">{g.group}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s.label}
                    className="rounded-full bg-white/6 px-3 py-1 text-xs text-white/80"
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {planet.links && (
            <ul className="flex flex-wrap gap-4">
              {planet.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm underline"
                    style={{ color: content.accent }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
