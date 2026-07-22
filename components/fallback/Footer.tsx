import { type Locale } from "@/lib/planets";

export default function Footer({ locale }: { locale: Locale }) {
    const fr = locale === "fr";
    return (
        <>
        <div className="font-(family-name:--mono) text-[10.5px] tracking-[0.06em] text-(--dim) text-center mt-5 mb-3 border-t border-solid border-(--line) p-3.5">
            {fr ? "fin de transmission" : "end of transmission"}
            <div>
               {fr ? "cartographie à 48.9° N · 2.2° E" : "mapped at 48.9° N · 2.2° E"}
            </div>
        </div>
        </>
    )
}
