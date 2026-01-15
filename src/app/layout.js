'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>crt.trader | Premium Forex Trading Community</title>
        <meta name="description" content="Join the exclusive Discord Master Signal group for high-precision Gold (XAUUSD) trading signals. Access premium trading tools and private class lessons." />
        <meta name="keywords" content="forex trading, gold trading, XAUUSD, trading signals, forex community, trading education" />
      </head>
      <body className={`${inter.variable} antialiased bg-[#0A0A0A]`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
