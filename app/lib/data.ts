export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  imageId: number;
  isSale?: boolean;
  description?: string;
}

export const categories = ["All", "Unstitched", "Ready to Wear", "Women", "Men", "Beauty"];

export const products: Product[] = [
  { id: 1, name: "Khaddar Kurta Shalwar", price: 4490, originalPrice: 6490, category: "Men", rating: 4.5, imageId: 1, isSale: true, description: "Premium quality khaddar fabric kurta shalwar set. Breathable, durable, and perfect for casual wear. Features a comfortable straight cut with embroidered neckline." },
  { id: 2, name: "Embroidered Lawn Suit", price: 5990, originalPrice: 8990, category: "Unstitched", rating: 4.7, imageId: 2, isSale: true, description: "Luxurious lawn suit with intricate thread embroidery. Includes 3 pieces: shirt, dupatta, and trouser. Lightweight and perfect for summer evenings." },
  { id: 3, name: "Printed 3-Piece Suit", price: 3990, originalPrice: 5490, category: "Ready to Wear", rating: 4.3, imageId: 3, isSale: true, description: "Ready-to-wear 3-piece suit with digital print. Features a matching trouser and dyed dupatta. Easy care and wrinkle-resistant fabric." },
  { id: 4, name: "Chiffon Dupatta", price: 2490, originalPrice: 3490, category: "Women", rating: 4.8, imageId: 4, description: "Elegant chiffon dupatta with delicate border work. Lightweight, flowing fabric with a subtle sheen. Pairs beautifully with any outfit." },
  { id: 5, name: "Cotton Shalwar Kameez", price: 3290, originalPrice: 4990, category: "Men", rating: 4.4, imageId: 5, isSale: true, description: "Pure cotton shalwar kameez for everyday comfort. Soft, breathable, and tailored for a perfect fit. Available in multiple colors." },
  { id: 6, name: "Digital Print Lawn", price: 4590, originalPrice: 6990, category: "Unstitched", rating: 4.2, imageId: 6, isSale: true, description: "Stunning digital print lawn fabric with vibrant floral patterns. Includes 3 meters of fabric with matching trouser and dupatta." },
  { id: 7, name: "Rose Perfume Oil", price: 1290, originalPrice: 1990, category: "Beauty", rating: 4.6, imageId: 7, description: "Concentrated rose perfume oil with long-lasting fragrance. Made from natural rose extracts. A single drop lasts all day." },
  { id: 8, name: "Organza Silk Suit", price: 7990, originalPrice: 10990, category: "Ready to Wear", rating: 4.1, imageId: 8, isSale: true, description: "Luxurious organza silk suit with gold thread work. Perfect for weddings and formal occasions. Includes embroidered dupatta." },
  { id: 9, name: "Hand-Embroidered Kurta", price: 5490, originalPrice: 7490, category: "Women", rating: 4.5, imageId: 9, description: "Hand-embroidered kurta in pure cotton silk. Features intricate thread work at neckline and hem. Pair with churidar or palazzo." },
  { id: 10, name: "Whitening Face Cream", price: 890, originalPrice: 1290, category: "Beauty", rating: 4.9, imageId: 10, description: "Natural whitening face cream with vitamin C and turmeric. Evens skin tone and reduces dark spots. Suitable for all skin types." },
  { id: 11, name: "Woolen Shawl", price: 2990, originalPrice: 4490, category: "Women", rating: 4.0, imageId: 11, isSale: true, description: "Premium woolen shawl with pashmina finish. Soft, warm, and lightweight. Features subtle embroidery at the borders." },
  { id: 12, name: "Karakoram Jacket", price: 6490, originalPrice: 8490, category: "Men", rating: 4.6, imageId: 12, description: "Inspired by the rugged Karakoram range. Water-resistant outer shell with warm inner lining. Perfect for northern winters." },
  { id: 13, name: "Kashmir Stole", price: 1990, originalPrice: 2990, category: "Women", rating: 4.3, imageId: 13, description: "Authentic Kashmir stole with hand-embroidered details. Made from fine pashmina wool. A timeless accessory for any wardrobe." },
  { id: 14, name: "Premium Attar Collection", price: 2490, originalPrice: 3990, category: "Beauty", rating: 4.4, imageId: 14, isSale: true, description: "Set of 5 premium attar oils in exotic fragrances. Includes oudh, rose, musk, jasmine, and amber. Each bottle is 6ml." },
  { id: 15, name: "Jamawar 3-Piece", price: 8990, originalPrice: 12990, category: "Unstitched", rating: 4.7, imageId: 15, isSale: true, description: "Exquisite Jamawar weave 3-piece unstitched suit. Traditional patterns with a modern twist. Includes fabric for shirt, trouser, and dupatta." },
  { id: 16, name: "Wash & Wear Suit", price: 3490, originalPrice: 4990, category: "Ready to Wear", rating: 4.2, imageId: 16, isSale: true, description: "Easy care wash & wear suit for everyday elegance. Wrinkle-resistant fabric that maintains its shape. Ready to wear straight from the wardrobe." },
];

export const formatPKR = (amount: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

export const categoryImages: Record<string, number> = {
  "Unstitched": 20,
  "Ready to Wear": 21,
  "Women": 22,
  "Men": 23,
  "Beauty": 24,
};
