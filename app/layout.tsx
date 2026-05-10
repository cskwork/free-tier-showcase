import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Tier Showcase — Build production products on $0/mo",
    template: "%s · Free Tier Showcase",
  },
  description:
    "A curated directory of free-tier services for indie developers and personal projects. Hosting, databases, auth, email, analytics — all browseable, with concrete limits and known caveats.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
