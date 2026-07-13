import { headers } from "next/headers";
import { isMobile } from "@/utils/isMobile";
import MobilePortfolio from "@/components/fallback/MobilePortfolio";

export default async function Home() {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
          {mobileCheck ?
          <MobilePortfolio/> : 
          <div> test</div>
          }
      </main>
    </div>
  );
}
