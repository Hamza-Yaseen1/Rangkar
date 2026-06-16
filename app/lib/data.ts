// =============================================================================
// PRODUCT DATA — DUMMY DATA FOR THE E-COMMERCE STORE
// =============================================================================
// This is the single source of truth for all product information.
// Add new products here, update prices, change descriptions, etc.
// All pages (home, category, cart, checkout, product detail) import from here.
// =============================================================================

/** Shape of every product in the store. Add fields here to extend product data. */
export interface Product {
  id: number;            // Unique identifier — used in routes (/product/[id]) and cart keys
  name: string;          // Display name on cards, detail pages, emails
  price: number;         // Current selling price in PKR (will be formatted by formatPKR)
  originalPrice: number; // Pre-sale price — shown with strikethrough when isSale = true
  category: string;      // Must match one of: "Unstitched", "Ready to Wear", "Women", "Men", "Beauty"
  rating: number;        // 0-5 scale, rendered as filled/empty stars
  image: string;         // Full URL to product image (600x600 recommended)
  isSale?: boolean;      // When true, shows discount badge, strikethrough original price, and appears on /sale
  description?: string;  // Shown on the product detail page
}

/** Available categories for the filter chips on the home page. Update if you add a new category. */
export const categories = ["All", "Unstitched", "Ready to Wear", "Women", "Men", "Beauty"];

/**
 * Generates a deterministic placeholder image URL using picsum.photos seed.
 * Each product gets a consistent, unique image based on its name slug.
 * TODO: Replace with real product photos from Unsplash or your own CDN.
 */
const seedUrl = (name: string) =>
  `https://picsum.photos/seed/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}/600/600`;

// ====================== PRODUCT LIST ======================
// Edit prices, add/remove products, or tweak descriptions below.
// The grid on the home page shows all 16 products (filterable by category).
// Category pages (/sale, /unstitched, /ready-to-wear, /men, /beauty) filter this list.
// ====================== 🔧 EDIT PRODUCTS BELOW ======================

export const products: Product[] = [
  // ---- Men ----
  { id: 1, name: "Khaddar Kurta Shalwar", price: 4490, originalPrice: 6490, category: "Men", rating: 4.5, image: "https://i.pinimg.com/736x/88/9b/33/889b33230d0307df9951e785f2fadef0.jpg", isSale: true, description: "Premium quality khaddar fabric kurta shalwar set. Breathable, durable, and perfect for casual wear. Features a comfortable straight cut with embroidered neckline." },
  { id: 5, name: "Cotton Shalwar Kameez", price: 3290, originalPrice: 4990, category: "Men", rating: 4.4, image:"https://i.pinimg.com/736x/2c/11/c6/2c11c68ae141027a1f2993e278c5dbab.jpg", isSale: true, description: "Pure cotton shalwar kameez for everyday comfort. Soft, breathable, and tailored for a perfect fit. Available in multiple colors." },
  { id: 12, name: "Karakoram Jacket", price: 6490, originalPrice: 8490, category: "Men", rating: 4.6, image: seedUrl("karakoram-jacket"), description: "Inspired by the rugged Karakoram range. Water-resistant outer shell with warm inner lining. Perfect for northern winters." },

  // ---- Unstitched ----
  { id: 2, name: "Embroidered Lawn Suit", price: 5990, originalPrice: 8990, category: "Unstitched", rating: 4.7, image: seedUrl("embroidered-lawn"), isSale: true, description: "Luxurious lawn suit with intricate thread embroidery. Includes 3 pieces: shirt, dupatta, and trouser. Lightweight and perfect for summer evenings." },
  { id: 6, name: "Digital Print Lawn", price: 4590, originalPrice: 6990, category: "Unstitched", rating: 4.2, image: seedUrl("digital-print-lawn"), isSale: true, description: "Stunning digital print lawn fabric with vibrant floral patterns. Includes 3 meters of fabric with matching trouser and dupatta." },
  { id: 15, name: "Jamawar 3-Piece", price: 8990, originalPrice: 12990, category: "Unstitched", rating: 4.7, image: seedUrl("jamawar-3piece"), isSale: true, description: "Exquisite Jamawar weave 3-piece unstitched suit. Traditional patterns with a modern twist. Includes fabric for shirt, trouser, and dupatta." },

  // ---- Ready to Wear ----
  { id: 3, name: "Printed 3-Piece Suit", price: 3990, originalPrice: 5490, category: "Ready to Wear", rating: 4.3, image: seedUrl("printed-3piece-suit"), isSale: true, description: "Ready-to-wear 3-piece suit with digital print. Features a matching trouser and dyed dupatta. Easy care and wrinkle-resistant fabric." },
  { id: 8, name: "Organza Silk Suit", price: 7990, originalPrice: 10990, category: "Ready to Wear", rating: 4.1, image: seedUrl("organza-silk-suit"), isSale: true, description: "Luxurious organza silk suit with gold thread work. Perfect for weddings and formal occasions. Includes embroidered dupatta." },
  { id: 16, name: "Wash & Wear Suit", price: 3490, originalPrice: 4990, category: "Ready to Wear", rating: 4.2, image: seedUrl("wash-wear-suit"), isSale: true, description: "Easy care wash & wear suit for everyday elegance. Wrinkle-resistant fabric that maintains its shape. Ready to wear straight from the wardrobe." },

  // ---- Women ----
  { id: 4, name: "Chiffon Dupatta", price: 2490, originalPrice: 3490, category: "Women", rating: 4.8, image: seedUrl("chiffon-dupatta"), description: "Elegant chiffon dupatta with delicate border work. Lightweight, flowing fabric with a subtle sheen. Pairs beautifully with any outfit." },
  { id: 9, name: "Hand-Embroidered Kurta", price: 5490, originalPrice: 7490, category: "Women", rating: 4.5, image: seedUrl("hand-embroidered-kurta"), description: "Hand-embroidered kurta in pure cotton silk. Features intricate thread work at neckline and hem. Pair with churidar or palazzo." },
  { id: 11, name: "Woolen Shawl", price: 2990, originalPrice: 4490, category: "Women", rating: 4.0, image: seedUrl("woolen-shawl"), isSale: true, description: "Premium woolen shawl with pashmina finish. Soft, warm, and lightweight. Features subtle embroidery at the borders." },
  { id: 13, name: "Kashmir Stole", price: 1990, originalPrice: 2990, category: "Women", rating: 4.3, image: seedUrl("kashmir-stole"), description: "Authentic Kashmir stole with hand-embroidered details. Made from fine pashmina wool. A timeless accessory for any wardrobe." },

  // ---- Beauty ----
  { id: 7, name: "Rose Perfume Oil", price: 1290, originalPrice: 1990, category: "Beauty", rating: 4.6, image: seedUrl("rose-perfume-oil"), description: "Concentrated rose perfume oil with long-lasting fragrance. Made from natural rose extracts. A single drop lasts all day." },
  { id: 10, name: "Whitening Face Cream", price: 890, originalPrice: 1290, category: "Beauty", rating: 4.9, image: seedUrl("whitening-face-cream"), description: "Natural whitening face cream with vitamin C and turmeric. Evens skin tone and reduces dark spots. Suitable for all skin types." },
  { id: 14, name: "Premium Attar Collection", price: 2490, originalPrice: 3990, category: "Beauty", rating: 4.4, image: seedUrl("premium-attar"), isSale: true, description: "Set of 5 premium attar oils in exotic fragrances. Includes oudh, rose, musk, jasmine, and amber. Each bottle is 6ml." },
];

// ====================== HELPERS ======================

/** Formats a number as PKR currency (e.g., 4490 → "PKR 4,490"). Used across all pages. */
export const formatPKR = (amount: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

/**
 * Maps each category to a picsum image ID for the category banner on the home page.
 * TODO: Replace with real category hero images.
 */
export const categoryImages: Record<string, number> = {
  "Unstitched": 20,
  "Ready to Wear": 21,
  "Women": 22,
  "Men": 23,
  "Beauty": 24,
};
