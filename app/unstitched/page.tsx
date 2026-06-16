// =============================================================================
// /unstitched — Unstitched Collection Page
// =============================================================================
// Shows all products with category === "Unstitched".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import Script from "next/script";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Unstitched Collection — Premium Unstitched Fabric Suits",
  description:
    "Browse premium unstitched fabric suits at Rangkar. Embroidered lawn suits, digital print lawn, Jamawar 3-piece, Chikankari — finest fabrics for custom tailoring.",
  openGraph: {
    title: "Unstitched Collection — Rangkar",
    description:
      "Premium unstitched fabric suits for custom tailoring. Embroidered lawn, digital print, Jamawar, and more.",
    url: `${siteUrl}/unstitched`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rangkar Unstitched Collection" }],
  },
  alternates: { canonical: `${siteUrl}/unstitched` },
};

export default function UnstitchedPage() {
  return (
    <>
      <Script
        id="breadcrumb-unstitched"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Unstitched Collection", item: `${siteUrl}/unstitched` },
            ],
          }),
        }}
      />
      <CategoryPage
        title="Unstitched Collection"
        subtitle="Premium fabric for custom tailoring — choose from our finest unstitched suits"
        category="Unstitched"
        bannerImageId={20}
      />
    </>
  );
}
