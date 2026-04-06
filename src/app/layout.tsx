import type { Metadata } from "next";
import { Bebas_Neue, Orbitron, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LanguageProvider from "@/components/providers/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const orbitron = Orbitron({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Detailing — Premium Car Detailing",
  description:
    "Luxury car detailing, ceramic coating, PPF wrapping, and leather restoration. Transform your vehicle with precision craftsmanship.",
  keywords: [
    "car detailing",
    "detailing auto",
    "ceramic coating",
    "PPF",
    "polish exterior",
    "wrapping auto",
    "detailing interior",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${orbitron.variable} ${inter.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <LanguageProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingCTA />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
