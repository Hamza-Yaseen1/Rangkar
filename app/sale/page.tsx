// =============================================================================
// /sale — Sale Products Page
// =============================================================================
// Shows all products where isSale === true.
// Delegates full layout (nav, hero banner, product grid, footer, toast) to the
// shared CategoryPage component. Only the configuration is here.
// =============================================================================

import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import Script from "next/script";

const siteUrl = "https://rangkar.vercel.app";

export const metadata: Metadata = {
  title: "Sale — Up to 50% Off | Rangkar",
  description:
    "Limited time offers — up to 50% off on premium Pakistani fashion. Shop khaddar kurta shalwar, embroidered lawn suits, wash & wear suits, and more at unbeatable prices.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sale — Up to 50% Off | Rangkar",
    description:
      "Limited time offers — up to 50% off on premium Pakistani fashion. Don't miss out!",
    url: `${siteUrl}/sale`,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "Rangkar Sale" }],
  },
  alternates: { canonical: `${siteUrl}/sale` },
};

export default function SalePage() {
  return (
    <>
      <Script
        id="breadcrumb-sale"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Sale", item: `${siteUrl}/sale` },
            ],
          }),
        }}
      />
      <CategoryPage
        title="Sale"
        subtitle="Limited time offers — up to 50% off on premium Pakistani fashion"
        isSale
        bannerImageId={40}
      />
    </>
  );
}
