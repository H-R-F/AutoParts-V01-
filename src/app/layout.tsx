import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AutoParts — Pièces détachées au Maroc",
    template: "%s | AutoParts",
  },
  description:
    "Trouvez facilement des pièces détachées automobiles au Maroc. Comparez les offres des magasins locaux, contactez les vendeurs directement.",
  keywords: [
    "pièces détachées",
    "auto parts",
    "Maroc",
    "pièces auto",
    "voiture",
    "OEM",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
