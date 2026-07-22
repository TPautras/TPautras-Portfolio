// components/fallback/StarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, LOCALES, t, type Locale } from "@/lib/planets";
import { useActiveSection } from "@/hooks/useActiveSection";

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

export function StarNav({ locale }: { locale: Locale }) {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const pathname = usePathname();

  // remplace le segment de langue courant par l'autre langue
  const hrefFor = (loc: Locale) => {
    const parts = pathname.split("/");
    parts[1] = loc; // /[locale]/...
    return parts.join("/") || `/${loc}`;
  };

  return (
    <nav
      aria-label={locale === "fr" ? "Navigation du relevé" : "Survey navigation"}
      className="fixed inset-x-0 top-0 z-50 flex max-w-110 items-center justify-between px-5.5 py-3"
      style={{ background: "linear-gradient(var(--void) 40%, transparent)" }}
    >
      <span className="font-(family-name:--mono) text-[11px] uppercase tracking-[0.12em] text-(--ink-dim)">
        {locale === "fr" ? "Relevé" : "Survey"} · T.P.
      </span>

      <div className="flex items-center gap-3.5">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              aria-label={t(s.label, locale)}
              aria-current={on}
              className="h-[9px] w-[9px] rounded-full transition-transform duration-300"
              style={{
                background: on ? s.accent : "var(--dim)",
                transform: on ? "scale(1.25)" : "none",
                boxShadow: on ? `0 0 10px 1px ${s.accent}` : "none",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 font-(family-name:--mono) text-[10px] uppercase tracking-widest">
        {LOCALES.map((loc, i) => (
          <span key={loc} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-(--dim)">/</span>}
            <Link
              href={hrefFor(loc)}
              aria-current={loc === locale}
              className="transition-colors"
              style={{ color: loc === locale ? "var(--sun)" : "var(--dim)" }}
            >
              {loc}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}