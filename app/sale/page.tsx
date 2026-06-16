// =============================================================================
// /sale — Sale Products Page
// =============================================================================
// Shows all products where isSale === true.
// Delegates full layout (nav, hero banner, product grid, footer, toast) to the
// shared CategoryPage component. Only the configuration is here.
// =============================================================================

import CategoryPage from "@/components/CategoryPage";

export default function SalePage() {
  return (
    <CategoryPage
      title="Sale"
      subtitle="Limited time offers — up to 50% off on premium Pakistani fashion"
      isSale                       // ← shows only isSale products
      bannerImageId={40}           // Hero banner image ID from picsum (change to match your brand)
    />
  );
}
