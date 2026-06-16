// =============================================================================
// /men — Men Collection Page
// =============================================================================
// Shows all products with category === "Men".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import Script from "next/script";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Men Collection — Premium Pakistani Menswear",
  description:
    "Explore classic & modern menswear at Rangkar. Khaddar kurta shalwar, cotton shalwar kameez, Karakoram jackets, and more — crafted for the modern Pakistani gentleman.",
  openGraph: {
    title: "Men Collection — Rangkar",
    description:
      "Classic & modern menswear — khaddar kurta shalwar, cotton shalwar kameez, and more.",
    url: `${siteUrl}/men`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rangkar Men Collection" }],
  },
  alternates: { canonical: `${siteUrl}/men` },
};

export default function MenPage() {
  return (
    <>
      <Script
        id="breadcrumb-men"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Men Collection", item: `${siteUrl}/men` },
            ],
          }),
        }}
      />
      <CategoryPage
        title="Men Collection"
        subtitle="Classic & modern menswear — crafted for the modern Pakistani gentleman"
        category="Men"
        bannerImageId={23}
      />
    </>
  );
}
