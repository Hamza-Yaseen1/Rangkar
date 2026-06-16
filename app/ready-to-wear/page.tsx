// =============================================================================
// /ready-to-wear — Ready to Wear Page
// =============================================================================
// Shows all products with category === "Ready to Wear".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import CategoryPage from "@/components/CategoryPage";

export default function ReadyToWearPage() {
  return (
    <CategoryPage
      title="Ready to Wear"
      subtitle="Instant fashion, ready to use — elegant ensembles for every occasion"
      category="Ready to Wear"     // ← filters products by this category
      bannerImageId={21}
    />
  );
}
