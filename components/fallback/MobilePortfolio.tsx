"use client";

import { useState } from "react";
import { PLANETS } from "@/lib/planets";
import { PlanetCard } from "./PlanetCards";
import { Starfield } from "./Starfield";
import Constellation from "./Constellation";

export default function MobilePortfolio() {
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
            <Starfield />
            <div className="wrap flex flex-col gap-4">
                <Constellation onSelect={select} />
                {PLANETS.map((element) => (
                    <PlanetCard
                        key={element.content.id}
                        planet={element}
                        open={openId === element.content.id}
                        onToggle={() =>
                            setOpenId((prev) =>
                                prev === element.content.id ? null : element.content.id,
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
}
