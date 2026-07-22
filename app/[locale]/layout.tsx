import type { Metadata, Viewport } from "next";
import { Cormorant, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: {
      default: fr
        ? "Thomas Pautras — Data & Intelligence Artificielle"
        : "Thomas Pautras — Data & Artificial Intelligence",
      template: "%s — Thomas Pautras",
    },
    description: fr
      ? "Portfolio de Thomas Pautras, étudiant ingénieur en data et intelligence artificielle. Un relevé de projets, d'expériences et de compétences."
      : "Portfolio of Thomas Pautras, data and artificial intelligence engineering student. A survey of projects, experiences and skills.",
    openGraph: {
      title: fr ? "Thomas Pautras — Data & IA" : "Thomas Pautras — Data & AI",
      description: fr
        ? "Relevé de projets, d'expériences et de compétences."
        : "A survey of projects, experiences and skills.",
      type: "website",
      locale: fr ? "fr_FR" : "en_US",
    },
    metadataBase: new URL("https://tpautras.fr"),
  };
}

export const viewport: Viewport = {
  themeColor: "#05060e",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
