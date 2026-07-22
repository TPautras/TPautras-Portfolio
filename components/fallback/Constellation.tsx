// components/fallback/Constellation.tsx
"use client";

import { useMemo } from "react";
import { SECTIONS, t, type Locale } from "@/lib/planets";

const CENTER = { x: 160, y: 112 };

// quelques étoiles de fond, purement décoratives
const FAINT = [
  { x: 118, y: 96 },
  { x: 292, y: 118 },
  { x: 30, y: 110 },
  { x: 205, y: 190 },
  { x: 150, y: 78 },
];

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

export default function Constellation({ locale }: { locale: Locale }) {
  // polyligne qui relie les étoiles extérieures dans l'ordre angulaire → un
  // contour fermé que l'impulsion parcourt. Recalculée uniquement si SECTIONS change.
  const pulsePoints = useMemo(() => {
    const ordered = [...SECTIONS].sort(
      (a, b) =>
        Math.atan2(a.star.y - CENTER.y, a.star.x - CENTER.x) -
        Math.atan2(b.star.y - CENTER.y, b.star.x - CENTER.x)
    );
    const pts = ordered.map((s) => `${s.star.x},${s.star.y}`);
    return [...pts, pts[0]].join(" "); // referme la boucle
  }, []);

  return (
    <svg
      className="constellation"
      viewBox="0 0 320 210"
      role="img"
      aria-label={
        locale === "fr"
          ? "Constellation reliant les sections ; l'étoile centrale représente l'observateur."
          : "Constellation linking the sections; the central star is the observer."
      }
    >
      {/* étoiles de fond */}
      {FAINT.map((f, i) => (
        <circle key={`f-${i}`} cx={f.x} cy={f.y} r={1.3} fill="#cdd4ff" opacity={0.35} />
      ))}

      {/* arêtes centre → étoile */}
      {SECTIONS.map((s) => (
        <line
          key={`edge-${s.id}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={s.star.x}
          y2={s.star.y}
          stroke="var(--line-2)"
          strokeWidth={1}
        />
      ))}

      {/* impulsion qui court sur le contour */}
      <polyline
        points={pulsePoints}
        fill="none"
        stroke="rgba(255,200,97,0.8)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray="6 220"
        className="motion-safe:animate-[travel_6s_linear_infinite]"
      />

      {/* soleil / observateur */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={16}
        fill="var(--sun)"
        opacity={0.25}
        className="motion-safe:animate-[breathe_5s_ease-in-out_infinite] [transform-origin:center]"
      />
      <circle cx={CENTER.x} cy={CENTER.y} r={6.5} fill="var(--sun)" />

      {/* étoiles-sections, cliquables */}
      {SECTIONS.map((s) => {
        const label = t(s.label, locale);
        const below = s.star.y < CENTER.y ? false : true; // label au-dessus si l'étoile est en haut
        return (
          <g
            key={s.id}
            className="cst-star"
            role="button"
            tabIndex={0}
            aria-label={(locale === "fr" ? "Aller à " : "Go to ") + label}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToId(s.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToId(s.id);
              }
            }}
          >
            <circle cx={s.star.x} cy={s.star.y} r={5} fill={s.accent} />
            <text
              className="cst-label"
              x={s.star.x}
              y={s.star.y + (below ? 16 : -12)}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}