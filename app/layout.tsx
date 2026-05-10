import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

/*
 * Two voices: a refined sans (Geist) for chrome and body, a quiet display
 * serif (Instrument Serif) for headlines and accents. Mono for numbers
 * inside cards. Static export friendly — next/font self-hosts everything.
 */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Free Tier Showcase — Build production products on $0/mo",
    template: "%s · Free Tier Showcase",
  },
  description:
    "A curated directory of free-tier services for indie developers and personal projects. Hosting, databases, auth, email, analytics — all browseable, with concrete limits and known caveats.",
  openGraph: {
    title: "Free Tier Showcase",
    description:
      "Curated free-tier services for indie developers — concrete limits, honest caveats, opinionated stacks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="paper-grain relative flex min-h-[100dvh] flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-1.5 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative z-[1] flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
