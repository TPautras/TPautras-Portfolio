// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Cormorant, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

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
export const metadata: Metadata = {
  title: {
    default: "Thomas Pautras — Data & Intelligence Artificielle",
    template: "%s — Thomas Pautras",
  },
  description:
    "Portfolio de Thomas Pautras, étudiant ingénieur en data et intelligence artificielle. " +
    "Un relevé de projets, d'expériences et de compétences.",
  openGraph: {
    title: "Thomas Pautras — Data & IA",
    description: "Relevé de projets, d'expériences et de compétences.",
    type: "website",
    locale: "fr_FR",
  },
  metadataBase: new URL("https://tpautras.fr"),
};

export const viewport: Viewport = {
  themeColor: "#05060e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
