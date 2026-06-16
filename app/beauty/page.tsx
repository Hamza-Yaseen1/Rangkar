// =============================================================================
// /beauty — Beauty & Accessories Page
// =============================================================================
// Shows all products with category === "Beauty".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import CategoryPage from "@/components/CategoryPage";

export default function BeautyPage() {
  return (
    <CategoryPage
      title="Beauty & Accessories"
      subtitle="Glow with premium products — curated beauty and accessories for you"
      category="Beauty"            // ← filters products by this category
      bannerImageId={24}
    />
  );
}
