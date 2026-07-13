"use client";
import { SECTIONS } from "@/lib/planets";

const CENTER = { x: 160, y: 112 };

export default function Constellation({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      className="constellation"
      viewBox="0 0 320 210"
      role="img"
      aria-label="Constellation reliant les sections ; l'étoile centrale représente l'observateur."
    >
      {SECTIONS.map((s) => (
        <line
          key={`edge-${s.id}`}
          className="cst-edge"
          x1={CENTER.x}
          y1={CENTER.y}
          x2={s.star.x}
          y2={s.star.y}
          stroke="var(--line-2)"
          strokeWidth={1}
        />
      ))}

      <circle className="cst-sun" cx={CENTER.x} cy={CENTER.y} r={6.5} fill="var(--sun)" />

      {SECTIONS.map((s) => {
        const above = s.star.y < CENTER.y;
        return (
          <g
            key={s.id}
            className="cst-star"
            role="button"
            tabIndex={0}
            aria-label={`Aller à ${s.label}`}
            style={{ color: s.accent, cursor: "pointer" }}
            onClick={() => onSelect(s.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(s.id);
              }
            }}
          >
            <circle className="cst-halo" cx={s.star.x} cy={s.star.y} r={11} fill="currentColor" />
            <circle className="cst-dot" cx={s.star.x} cy={s.star.y} r={5} fill="currentColor" />
            <text
              className="cst-label"
              x={s.star.x}
              y={s.star.y + (above ? -13 : 19)}
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
