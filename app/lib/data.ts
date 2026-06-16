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
  { 
    id: 1, 
    name: "Khaddar Kurta Shalwar", 
    price: 4490, 
    originalPrice: 6490, 
    category: "Men", 
    rating: 4.5, 
    image: "https://i.pinimg.com/736x/eb/f7/ba/ebf7bae18cd656fa6ae31820b54e1df4.jpg", 
    isSale: true, 
    description: "Premium quality khaddar fabric kurta shalwar set. Breathable, durable, and perfect for casual wear. Features a comfortable straight cut with embroidered neckline." 
  },
  { 
    id: 2, 
    name: "Cotton Shalwar Kameez", 
    price: 3290, 
    originalPrice: 4990, 
    category: "Men", 
    rating: 4.4, 
    image: "https://i.pinimg.com/736x/88/9b/33/889b33230d0307df9951e785f2fadef0.jpg", 
    isSale: true, 
    description: "Pure cotton shalwar kameez for everyday comfort. Soft, breathable, and tailored for a perfect fit. Available in multiple colors." 
  },
  { 
    id: 3, 
    name: "Karakoram Jacket", 
    price: 6490, 
    originalPrice: 8490, 
    category: "Men", 
    rating: 4.6, 
    image: "https://i.pinimg.com/736x/67/58/13/6758131b4d8e7b7188ed47e82b255da2.jpg", 
    description: "Inspired by the rugged Karakoram range. Water-resistant outer shell with warm inner lining. Perfect for northern winters." 
  },

  // ---- Unstitched ----
  { 
    id: 4, 
    name: "Embroidered Lawn Suit", 
    price: 5990, 
    originalPrice: 8990, 
    category: "Unstitched", 
    rating: 4.7, 
    image: "https://i.pinimg.com/736x/18/73/45/187345d686fd2ead6f4aed24bed743fc.jpg", 
    isSale: true, 
    description: "Luxurious lawn suit with intricate thread embroidery. Includes 3 pieces: shirt, dupatta, and trouser. Lightweight and perfect for summer evenings." 
  },
  { 
    id: 5, 
    name: "Digital Print Lawn", 
    price: 4590, 
    originalPrice: 6990, 
    category: "Unstitched", 
    rating: 4.2, 
    image: "https://i.pinimg.com/736x/64/52/02/645202cbca565b7c022013715889069c.jpg", 
    isSale: true, 
    description: "Stunning digital print lawn fabric with vibrant floral patterns. Includes 3 meters of fabric with matching trouser and dupatta." 
  },
  { 
    id: 6, 
    name: "Jamawar 3-Piece", 
    price: 8990, 
    originalPrice: 12990, 
    category: "Unstitched", 
    rating: 4.7, 
    image: "https://i.pinimg.com/736x/2f/b7/67/2fb7674314e171a58a99fe3f0ef96d81.jpg", 
    isSale: true, 
    description: "Exquisite Jamawar weave 3-piece unstitched suit. Traditional patterns with a modern twist. Includes fabric for shirt, trouser, and dupatta." 
  },

  // ---- Ready to Wear ----
  { 
    id: 7, 
    name: "Printed 3-Piece Suit", 
    price: 3990, 
    originalPrice: 5490, 
    category: "Ready to Wear", 
    rating: 4.3, 
    image: "https://i.pinimg.com/736x/bb/6e/4a/bb6e4af3540b34bf0fa63ddcfbf7b1da.jpg", 
    isSale: true, 
    description: "Ready-to-wear 3-piece suit with digital print. Features a matching trouser and dyed dupatta. Easy care and wrinkle-resistant fabric." 
  },
  { 
    id: 8, 
    name: "Organza Silk Suit", 
    price: 7990, 
    originalPrice: 10990, 
    category: "Ready to Wear", 
    rating: 4.1, 
    image: "https://i.pinimg.com/736x/59/3d/a7/593da775acd6620e2aa5bc53a6c974c8.jpg", 
    isSale: true, 
    description: "Luxurious organza silk suit with gold thread work. Perfect for weddings and formal occasions. Includes embroidered dupatta." 
  },
  { 
    id: 9, 
    name: "Wash & Wear Suit", 
    price: 3490, 
    originalPrice: 4990, 
    category: "Ready to Wear", 
    rating: 4.2, 
    image: "https://i.pinimg.com/736x/33/c9/75/33c9754d998c41002ffb06acf2803a1b.jpg", 
    isSale: true, 
    description: "Easy care wash & wear suit for everyday elegance. Wrinkle-resistant fabric that maintains its shape. Ready to wear straight from the wardrobe." 
  },

  // ---- Women ----
  { 
    id: 10, 
    name: "Chiffon Dupatta", 
    price: 2490, 
    originalPrice: 3490, 
    category: "Women", 
    rating: 4.8, 
    image: "https://i.pinimg.com/736x/11/27/c5/1127c51e4010bb7aad24357a7b0d0e54.jpg", 
    description: "Elegant chiffon dupatta with delicate border work. Lightweight, flowing fabric with a subtle sheen. Pairs beautifully with any outfit." 
  },
  { 
    id: 11, 
    name: "Hand-Embroidered Kurta", 
    price: 5490, 
    originalPrice: 7490, 
    category: "Women", 
    rating: 4.5, 
    image: "https://i.pinimg.com/736x/1a/7b/b8/1a7bb8123cdeb3bd32cc79c96719b367.jpg", 
    description: "Hand-embroidered kurta in pure cotton silk. Features intricate thread work at neckline and hem. Pair with churidar or palazzo." 
  },
  { 
    id: 12, 
    name: "Woolen Shawl", 
    price: 2990, 
    originalPrice: 4490, 
    category: "Women", 
    rating: 4.0, 
    image: "https://i.pinimg.com/736x/9c/be/92/9cbe922f7fdcf8ce7bbae8ef19e04b90.jpg", 
    isSale: true, 
    description: "Premium woolen shawl with pashmina finish. Soft, warm, and lightweight. Features subtle embroidery at the borders." 
  },
  { 
    id: 13, 
    name: "Kashmir Stole", 
    price: 1990, 
    originalPrice: 2990, 
    category: "Women", 
    rating: 4.3, 
    image: "https://i.pinimg.com/736x/67/fa/c5/67fac533118167c8561f2589329b429f.jpg", 
    description: "Authentic Kashmir stole with hand-embroidered details. Made from fine pashmina wool. A timeless accessory for any wardrobe." 
  },

  // ---- Beauty ----
  { 
    id: 14, 
    name: "Rose Perfume Oil", 
    price: 1290, 
    originalPrice: 1990, 
    category: "Beauty", 
    rating: 4.6, 
    image: "https://i.pinimg.com/736x/47/84/dd/4784dd9daf2bc854a0ca3d0757a0c22f.jpg", 
    description: "Concentrated rose perfume oil with long-lasting fragrance. Made from natural rose extracts. A single drop lasts all day." 
  },
  { 
    id: 15, 
    name: "Whitening Face Cream", 
    price: 890, 
    originalPrice: 1290, 
    category: "Beauty", 
    rating: 4.9, 
    image: "https://i.pinimg.com/736x/4f/22/ae/4f22aee53d7c6d1aaffd3f73ac2283c4.jpg", 
    description: "Natural whitening face cream with vitamin C and turmeric. Evens skin tone and reduces dark spots. Suitable for all skin types." 
  },
  { 
    id: 16, 
    name: "Premium Attar Collection", 
    price: 2490, 
    originalPrice: 3990, 
    category: "Beauty", 
    rating: 4.4, 
    image: "https://i.pinimg.com/736x/d1/64/8e/d1648ec7438899f6eb2021b3a501b805.jpg", 
    isSale: true, 
    description: "Set of 5 premium attar oils in exotic fragrances. Includes oudh, rose, musk, jasmine, and amber. Each bottle is 6ml." 
  },

  // ---- New Products ----
  // Men
  { 
    id: 17, 
    name: "Wool Blend Waistcoat", 
    price: 3890, 
    originalPrice: 5490, 
    category: "Men", 
    rating: 4.3, 
    image: "https://i.pinimg.com/736x/37/8f/31/378f316e6918afb486d1e674e18f22a0.jpg", 
    isSale: true, 
    description: "Elegant wool blend waistcoat with traditional button detailing. Perfect for formal and semi-formal occasions." 
  },
  // Unstitched
  { 
    id: 18, 
    name: "Chikankari Lawn Suit", 
    price: 5290, 
    originalPrice: 7490, 
    category: "Unstitched", 
    rating: 4.6, 
    image: "https://i.pinimg.com/736x/59/3d/a7/593da775acd6620e2aa5bc53a6c974c8.jpg", 
    isSale: true, 
    description: "Delicate chikankari embroidered lawn suit. Includes shirt, dupatta, and trouser. Ideal for festive wear." 
  },
  // Ready to Wear
  { 
    id: 19, 
    name: "Silk Anarkali Dress", 
    price: 6790, 
    originalPrice: 8990, 
    category: "Ready to Wear", 
    rating: 4.8, 
    image: "https://i.pinimg.com/736x/2f/b7/67/2fb7674314e171a58a99fe3f0ef96d81.jpg", 
    isSale: false, 
    description: "Flowing silk Anarkali with heavy embroidery. Perfect for weddings and special occasions." 
  },
  // Women
  { 
    id: 20, 
    name: "Embroidered Chiffon Saree", 
    price: 6990, 
    originalPrice: 9990, 
    category: "Women", 
    rating: 4.7, 
    image: "https://i.pinimg.com/736x/64/52/02/645202cbca565b7c022013715889069c.jpg", 
    description: "Luxurious embroidered chiffon saree with matching blouse. Elegant drape and rich colors." 
  },
  // Beauty
  { 
    id: 21, 
    name: "Sandalwood Attar", 
    price: 1490, 
    originalPrice: 2290, 
    category: "Beauty", 
    rating: 4.5, 
    image: "https://i.pinimg.com/736x/47/84/dd/4784dd9daf2bc854a0ca3d0757a0c22f.jpg", 
    isSale: true, 
    description: "Pure sandalwood attar with deep woody fragrance. Long-lasting and soothing." 
  },
  { 
    id: 22, 
    name: "Herbal Hair Oil", 
    price: 790, 
    originalPrice: 1190, 
    category: "Beauty", 
    rating: 4.8, 
    image: "https://i.pinimg.com/736x/4f/22/ae/4f22aee53d7c6d1aaffd3f73ac2283c4.jpg", 
    description: "Ayurvedic herbal hair oil enriched with amla, bhringraj, and coconut. Promotes hair growth and shine." 
  },
];

// ====================== HELPERS ======================

/** Formats a number as PKR currency (e.g., 4490 → "PKR 4,490"). Used across all pages. */
export const formatPKR = (amount: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

/**
 * Maps each category to its Pinterest image URL for the category banner on the home page.
 * IMPORTANT: Replace these URLs with actual Pinterest images for your categories.
 * To get Pinterest image URLs:
 * 1. Go to pinterest.com and search for "Pakistani unstitched fabric" etc.
 * 2. Right-click on an image and select "Copy image address"
 * 3. Paste the URL here (use the 736x format for better quality)
 */
export const categoryImageUrls: Record<string, string> = {
  "Unstitched": "https://i.pinimg.com/736x/61/6b/d4/616bd4b269f2b1f7aba14c5153df9715.jpg", // Replace with actual unstitched fabric image
  "Ready to Wear": "https://i.pinimg.com/736x/18/73/45/187345d686fd2ead6f4aed24bed743fc.jpg", // Your current image
  "Men": "https://i.pinimg.com/736x/4f/70/02/4f700279342afcf8e82c6daba348851c.jpg", // Replace with men's clothing image
  "Beauty": "https://i.pinimg.com/736x/95/38/53/953853864467b9ed81389ce088c60953.jpg", // Replace with beauty products image
};
