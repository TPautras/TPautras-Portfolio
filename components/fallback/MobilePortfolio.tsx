"use client";

import { useState } from "react";
import { Locale, PLANETS } from "@/lib/planets";
import { PlanetCard } from "./PlanetCards";
import { Starfield } from "./Starfield";
import Constellation from "./Constellation";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import { StarNav } from "./Navbar";

export default function MobilePortfolio({locale}: {locale: Locale}) {
    const [openId, setOpenId] = useState<string | null>(null);

    const select = (id: string) => {
        setOpenId(id);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <div className="w-full h-full">
            <div className="mb-20">
                <StarNav locale={locale}/>
            </div>
            <Starfield />
            <div className="wrap flex flex-col gap-4">
                <Constellation locale={locale}/>
                <HeroSection locale={locale}/>
                {PLANETS.map((element) => (
                    <PlanetCard
                        key={element.content.id}
                        planet={element}
                        locale={locale}
                        open={openId === element.content.id}
                        onToggle={() =>
                            setOpenId((prev) =>
                                prev === element.content.id ? null : element.content.id,
                            )
                        }
                    />
                ))}
            </div>
            <Footer locale={locale}/>
        </div>
    );
}
