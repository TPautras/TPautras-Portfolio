"use client";

import { useEffect, useRef, useState } from "react";
import type { Planet } from "@/lib/planets";

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
  const accent = content.accent;
  const panelId = `d-${content.id}`;

  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const meta = planet.projects
    ? `${planet.projects.length} objets catalogués`
    : planet.experiences
    ? `${planet.experiences.length} entrées de journal`
    : planet.skills
    ? `${planet.skills.length} bandes mesurées`
    : null;

  return (
    <section
      ref={ref}
      id={content.id}
      className={`scroll-mt-20 border-t border-(--line) py-10 transition-[opacity,transform] duration-700 ease-out ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full touch-manipulation items-start gap-4 text-left"
      >
        <span className="relative mt-1 block shrink-0" aria-hidden>
          <span
            className="grid h-[46px] w-[46px] place-items-center rounded-full text-lg motion-safe:animate-[float_7s_ease-in-out_infinite]"
            style={{
              background: `radial-gradient(circle at 32% 30%, #ffffff99, transparent 42%), radial-gradient(circle at 34% 32%, ${accent}, #05060e 118%)`,
              boxShadow: `0 0 26px -4px ${accent}, inset -6px -6px 14px rgba(0,0,0,0.55)`,
              color: "#05060e",
            }}
          >
          </span>
          {planet.orbit?.ring && (
            <span
              className="pointer-events-none absolute rounded-full"
              style={{
                inset: "-9px -18px",
                border: `2px solid ${accent}`,
                opacity: 0.5,
                transform: "rotate(-24deg)",
                boxShadow: `0 0 8px -2px ${accent}`,
              }}
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          {content.label !== content.headline && (
            <span
              className="block font-(family-name:--mono) text-[10.5px] font-bold uppercase tracking-[0.16em]"
              style={{ color: accent }}
            >
              {content.label}
            </span>
          )}
          <span className="block font-(family-name:--display) text-[2.15rem] font-semibold leading-none tracking-[-0.01em] text-(--ink)">
            {content.headline}
          </span>
          <span className="mt-3 block text-sm text-(--ink-dim)">{content.summary}</span>
          {meta && (
            <span className="mt-3 block font-(family-name:--mono) text-[10.5px] uppercase tracking-[0.08em] text-(--dim)">
              <span style={{ color: accent }}>◆</span> {meta}
            </span>
          )}
        </span>

        <span
          className="ml-auto mt-1 shrink-0 text-sm transition-transform"
          style={{ color: accent, transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows,opacity] duration-[450ms] ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="space-y-6 pt-6">
            {planet.body && (
              <p className="text-sm leading-relaxed text-(--ink-dim)">{planet.body}</p>
            )}

            {planet.projects?.map((p) => (
              <article
                key={p.title}
                className="border-t border-(--line) pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-(family-name:--display) text-[1.28rem] font-semibold text-(--ink)">
                    {p.title}
                  </h3>
                  {p.year && (
                    <span className="font-(family-name:--mono) text-[10px] text-(--dim)">
                      {p.year}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-(--ink-dim)">{p.description}</p>
                <p className="mt-2 font-(family-name:--mono) text-[10px] tracking-[0.05em] text-(--dim)">
                  {p.stack.join(" · ")}
                </p>
                <div className="mt-2.5 flex gap-4 text-xs font-semibold">
                  {p.href && (
                    <a href={p.href} className="underline underline-offset-2" style={{ color: accent }}>
                      Démo →
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} className="underline underline-offset-2" style={{ color: accent }}>
                      Code →
                    </a>
                  )}
                </div>
              </article>
            ))}

            {planet.experiences?.map((e) => (
              <article
                key={e.role + e.org}
                className="border-l-2 pl-[18px]"
                style={{ borderColor: accent }}
              >
                <h3 className="font-(family-name:--display) text-[1.24rem] font-semibold leading-tight text-(--ink)">
                  {e.role} — {e.org}
                </h3>
                <p className="mt-1 font-(family-name:--mono) text-[10px] text-(--dim)">{e.period}</p>
                <p className="mt-2 text-sm text-(--ink-dim)">{e.description}</p>
              </article>
            ))}

            {planet.skills?.map((g) => {
              const leveled = g.items.some((s) => typeof s.level === "number");
              return (
                <div key={g.group}>
                  <h3 className="mb-3 font-(family-name:--mono) text-[10px] uppercase tracking-[0.16em] text-(--dim)">
                    {g.group}
                  </h3>
                  {leveled ? (
                    <div className="space-y-2.5">
                      {g.items.map((s) => (
                        <div key={s.label}>
                          <div className="mb-1.5 flex items-center justify-between text-[0.82rem] text-(--ink)">
                            <span>{s.label}</span>
                            <span className="font-(family-name:--mono) text-[9.5px] text-(--dim)">
                              mag {s.level ?? 0}
                            </span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-[2px] bg-(--line)">
                            <div
                              className="h-full rounded-[2px] transition-[width] duration-1000 ease-out"
                              style={{
                                width: open ? `${(s.level ?? 0) * 100}%` : "0%",
                                background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 30%, transparent), ${accent})`,
                                boxShadow: `0 0 8px -1px ${accent}`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li
                          key={s.label}
                          className="rounded-full bg-white/6 px-3 py-1 text-xs text-(--ink-dim)"
                        >
                          {s.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            {planet.links && (
              <ul>
                {planet.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center justify-between border-b border-(--line) py-3.5 last:border-b-0"
                    >
                      <span className="font-(family-name:--display) text-[1.35rem] font-semibold text-(--ink)">
                        {l.label}
                      </span>
                      <span
                        className="font-(family-name:--mono) text-[11px] transition-transform group-hover:translate-x-1"
                        style={{ color: accent }}
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}