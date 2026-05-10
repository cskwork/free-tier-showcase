import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

/*
 * Two voices: Inter for chrome, body, and headings (PH uses a humanist sans
 * system-wide); Geist Mono for tabular numbers and meta labels. Static
 * export friendly — next/font self-hosts everything.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body className="relative flex min-h-[100dvh] flex-col bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-1.5 focus:text-on-orange"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
