import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/cart";
import { SearchProvider } from "@/app/context/search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rangkar - Premium Pakistani Fashion",
  description: "Discover premium unstitched fabrics, ready-to-wear ensembles, and timeless accessories for the modern Pakistani wardrobe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider><SearchProvider>{children}</SearchProvider></CartProvider>
      </body>
    </html>
  );
}
