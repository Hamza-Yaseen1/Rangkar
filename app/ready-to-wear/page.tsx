// =============================================================================
// /ready-to-wear — Ready to Wear Page
// =============================================================================
// Shows all products with category === "Ready to Wear".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import Script from "next/script";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Ready to Wear — Premium Pakistani Ready-to-Wear Ensembles",
  description:
    "Shop instant fashion at Rangkar. Printed 3-piece suits, organza silk suits, wash & wear suits, silk Anarkali dresses — elegant ensembles for every occasion.",
  openGraph: {
    title: "Ready to Wear — Rangkar",
    description:
      "Instant fashion, ready to use. Printed suits, organza silk, wash & wear, Anarkali dresses — elegant ensembles for every occasion.",
    url: `${siteUrl}/ready-to-wear`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rangkar Ready to Wear" }],
  },
  alternates: { canonical: `${siteUrl}/ready-to-wear` },
};

export default function ReadyToWearPage() {
  return (
    <>
      <Script
        id="breadcrumb-rtw"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ready to Wear",
                item: `${siteUrl}/ready-to-wear`,
              },
            ],
          }),
        }}
      />
      <CategoryPage
        title="Ready to Wear"
        subtitle="Instant fashion, ready to use — elegant ensembles for every occasion"
        category="Ready to Wear"
        bannerImageId={21}
      />
    </>
  );
}
