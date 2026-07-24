"use client";

import { PLANETS, type Locale } from "@/lib/planets";
import { useSceneStore } from "@/store/useSceneStore";
import { PlanetCard } from "@/components/fallback/PlanetCards";

export default function SectionOverlay({ locale }: { locale: Locale }) {
  const selectedSlug = useSceneStore((s) => s.selectedSlug);
  const closePanel = useSceneStore((s) => s.closePanel);

  const planet = PLANETS.find((p) => p.content.id === selectedSlug);

  return (
    <aside
      className="fixed right-0 top-0 z-20 h-dvh w-full max-w-105 overflow-y-auto border-l border-(--line) bg-(--void)/90 px-6 py-8 backdrop-blur-md transition-transform duration-500 ease-out"
      style={{ transform: planet ? "translateX(0)" : "translateX(100%)" }}
      aria-hidden={!planet}
    >
      {planet && (
        <>
          <button
            onClick={closePanel}
            className="mb-4 font-(family-name:--mono) text-xs uppercase tracking-[0.14em] text-(--dim) transition-colors hover:text-(--ink)"
          >
            ✕ {locale === "fr" ? "Fermer" : "Close"}
          </button>
          <PlanetCard planet={planet} locale={locale} open onToggle={closePanel} />
        </>
      )}
    </aside>
  );
}
