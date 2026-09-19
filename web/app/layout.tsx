import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import Nav from "@/components/Nav";
import Chatbot from "@/components/Chatbot";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · Secluded Retreat in Zion, Illinois`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.pitch,
  openGraph: {
    title: `${SITE.name} · Secluded Retreat with Workspaces & Nature Trails`,
    description: SITE.pitch,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <Nav />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
