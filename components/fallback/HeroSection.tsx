import { type Locale } from "@/lib/planets";

export default function HeroSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <header className="pt-18.5 pb-6">

      <h1 className="font-(family-name:--display) font-semibold text-[3.4rem] leading-[0.96] tracking-[-0.01em] text-center mt-2.5">
        Thomas <em className="font-medium text-(--sun)">Pautras</em>
      </h1>

      <p className="text-center uppercase tracking-[0.16em] text-[0.82rem] font-medium text-(--ink-dim) mt-3">
        {fr ? "Data & Intelligence Artificielle" : "Data & Artificial Intelligence"}
      </p>

      <p className="font-(family-name:--display) italic text-[1.32rem] leading-[1.35] text-center text-(--ink) max-w-[22em] mx-auto mt-5">
        Jack of all trades master of none, though oftentimes better than master of one.
      </p>

      <p className="font-(family-name:--mono) text-[10.5px] tracking-[0.06em] text-(--dim) text-center mt-5">
        <span className="text-(--ink-dim)">α</span> 18ʰ36ᵐ &nbsp;·&nbsp;
        <span className="text-(--ink-dim)">δ</span> +38°47′ &nbsp;·&nbsp;
        <span className="text-(--ink-dim)">type</span> A0 &nbsp;·&nbsp;
        <span className="text-(--ink-dim)">mag</span> 0.03
      </p>

      <div className="flex flex-col items-center gap-2 mt-9 text-(--dim) font-(family-name:--mono) text-[10px] tracking-[0.2em] uppercase">
        <span>{fr ? "Parcourir le relevé" : "Browse the survey"}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" aria-hidden="true"
          className="motion-safe:animate-[fall_2.2s_ease-in-out_infinite]"
        >
          <path d="M12 4v16M6 14l6 6 6-6" />
        </svg>
      </div>
    </header>
  );
}
