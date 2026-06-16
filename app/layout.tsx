import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rangkar — Premium Pakistani Fashion | Unstitched & Ready-to-Wear",
    template: "%s | Rangkar",
  },
  description:
    "Shop premium unstitched fabrics, ready-to-wear ensembles, and beauty essentials. Premium Pakistani fashion crafted for elegance — free shipping over PKR 5,000.",
  keywords: [
    "Pakistani fashion",
    "unstitched fabric",
    "ready to wear",
    "Pakistani clothing",
    "lawn suits",
    "khaddar kurta",
    "Pakistani beauty products",
    "Rangkar",
  ],
  authors: [{ name: "Rangkar" }],
  creator: "Rangkar",
  publisher: "Rangkar",
  robots: {
    index: true,
    follow: true,
    "max-snippet": 150,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Rangkar",
    title: "Rangkar — Premium Pakistani Fashion",
    description:
      "Premium unstitched fabrics, ready-to-wear ensembles, and beauty essentials for the modern Pakistani wardrobe.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rangkar — Premium Pakistani Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rangkar — Premium Pakistani Fashion",
    description:
      "Premium unstitched fabrics, ready-to-wear ensembles, and beauty essentials for the modern Pakistani wardrobe.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider><SearchProvider>{children}</SearchProvider></CartProvider>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rangkar",
              url: siteUrl,
              logo: `${siteUrl}/favicon.ico`,
              description:
                "Premium Pakistani fashion since 2025. Unstitched, ready-to-wear, and beauty essentials crafted for elegance.",
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "hello@rangkar.com",
              },
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
