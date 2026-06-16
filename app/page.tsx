import type { Metadata } from "next";
import Script from "next/script";
import HomePage from "@/app/_components/HomePage";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Rangkar — Premium Pakistani Fashion | Unstitched & Ready-to-Wear",
  description:
    "Shop premium unstitched fabrics, ready-to-wear ensembles, and beauty essentials at Rangkar. Premium Pakistani fashion crafted for elegance — free shipping over PKR 5,000.",
  openGraph: {
    title: "Rangkar — Premium Pakistani Fashion",
    description:
      "Discover premium unstitched fabrics, ready-to-wear ensembles, and timeless accessories for the modern Pakistani wardrobe.",
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
  alternates: { canonical: siteUrl },
};

export default function Home() {
  return (
    <>
      <Script
        id="breadcrumb-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            ],
          }),
        }}
      />
      <HomePage />
    </>
  );
}
