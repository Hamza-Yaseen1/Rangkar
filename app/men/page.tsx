// =============================================================================
// /men — Men Collection Page
// =============================================================================
// Shows all products with category === "Men".
// Delegates full layout to the shared CategoryPage component.
// =============================================================================

import CategoryPage from "@/components/CategoryPage";

export default function MenPage() {
  return (
    <CategoryPage
      title="Men Collection"
      subtitle="Classic & modern menswear — crafted for the modern Pakistani gentleman"
      category="Men"               // ← filters products by this category
      bannerImageId={23}
    />
  );
}
