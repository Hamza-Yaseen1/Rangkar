// =============================================================================
// /unstitched — Unstitched Collection Page
// =============================================================================
// Shows all products with category === "Unstitched".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import CategoryPage from "@/components/CategoryPage";

export default function UnstitchedPage() {
  return (
    <CategoryPage
      title="Unstitched Collection"
      subtitle="Premium fabric for custom tailoring — choose from our finest unstitched suits"
      category="Unstitched"        // ← filters products by this category
      bannerImageId={20}
    />
  );
}
