// =============================================================================
// /beauty — Beauty & Accessories Page
// =============================================================================
// Shows all products with category === "Beauty".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import Script from "next/script";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Beauty & Accessories — Premium Pakistani Beauty Products",
  description:
    "Discover curated beauty products at Rangkar. Rose perfume oil, whitening face cream, premium attar collection, sandalwood attar, herbal hair oil — glow with elegance.",
  openGraph: {
    title: "Beauty & Accessories — Rangkar",
    description:
      "Glow with premium beauty products — perfumes, skincare, and accessories curated for elegance.",
    url: `${siteUrl}/beauty`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rangkar Beauty & Accessories" }],
  },
  alternates: { canonical: `${siteUrl}/beauty` },
};

export default function BeautyPage() {
  return (
    <>
      <Script
        id="breadcrumb-beauty"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Beauty & Accessories", item: `${siteUrl}/beauty` },
            ],
          }),
        }}
      />
      <CategoryPage
        title="Beauty & Accessories"
        subtitle="Glow with premium products — curated beauty and accessories for you"
        category="Beauty"
        bannerImageId={24}
      />
    </>
  );
}
