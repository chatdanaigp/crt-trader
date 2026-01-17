'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <head>
        <title>crt.trader | Premium Forex Trading Community</title>
        <meta name="description" content="Join the exclusive Discord Master Signal group for high-precision Gold (XAUUSD) trading signals. Access premium trading tools and private class lessons." />
        <meta name="keywords" content="forex trading, gold trading, XAUUSD, trading signals, forex community, trading education" />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
