import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isMobile } from "@/utils/isMobile";
import MobilePortfolio from "@/components/fallback/MobilePortfolio";
import type { Locale } from "@/lib/planets";
import SolarSystem from "@/components/scene/SolarSystem";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center font-sans">
      <main className="flex w-full flex-1 flex-col items-center justify-between sm:items-start">
        {mobileCheck ? (
          <MobilePortfolio locale={locale as Locale} />
        ) : (
          <SolarSystem/>
        )}
      </main>
    </div>
  );
}
