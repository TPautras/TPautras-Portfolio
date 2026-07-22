import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isMobile } from "@/utils/isMobile";
import MobilePortfolio from "@/components/fallback/MobilePortfolio";
import type { Locale } from "@/lib/planets";

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
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between sm:items-start">
        {mobileCheck ? (
          <MobilePortfolio locale={locale as Locale} />
        ) : (
          <div> test</div>
        )}
      </main>
    </div>
  );
}
