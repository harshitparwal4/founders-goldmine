import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FounderProvider } from "@/context/FounderContext";

import { Suspense } from "react";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Founder's Goldmine • India's Founder OS",
  description: "Stop Doomscrolling. Start Building. The ultimate execution platform for first-generation Indian entrepreneurs.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-foreground overflow-x-hidden select-none">
        <FounderProvider>
          <Suspense fallback={
            <div className="min-h-screen bg-[#0B0F19] text-slate-400 flex items-center justify-center font-sans text-xs">
              Compiling OS Cockpit...
            </div>
          }>
            {children}
          </Suspense>
        </FounderProvider>
      </body>
    </html>
  );
}
