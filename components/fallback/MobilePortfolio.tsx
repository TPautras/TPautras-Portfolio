import { PLANETS } from "@/lib/planets";
import { PlanetCard } from "./PlanetCards";
import { Starfield } from "./Starfield";

//components/fallback/MobilePortfolio.tsx
export default function MobilePortfolio() {
    return (
        <>
        <Starfield/>
        {PLANETS.map((element, i) => (
            <div key={i}>
              <PlanetCard planet={element}/>
            </div>
        ))}
        </>
    )
}