import { PlanetCard } from "@/components/fallback/PlanetCards";
import { PLANETS } from "@/lib/planets";
import { headers } from "next/headers";
import { isMobile } from "@/utils/isMobile";

export default async function Home() {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-1 flex-col md:hidden">
          {mobileCheck ? (PLANETS.map((element, i) => (
            <div key={i} className="bg-amber-50 dark:bg-black">
              <PlanetCard planet={element}/>
            </div>
          ))) : 
          <div> test</div>
          }
        </div>    
        <div className="hidden lg:block">
          Test
        </div>
      </main>
    </div>
  );
}
