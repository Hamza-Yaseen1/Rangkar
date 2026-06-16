// =============================================================================
// PRODUCT DETAIL PAGE — /product/[id]
// =============================================================================
// Shows full product info: zoom-able image, quantity selector, add-to-cart
// with loading state, trust badges, and "You May Also Like" related products.
//
// Dynamic route — looks up product by ID from the products array in data.ts.
// Shows a 404 state if the product ID doesn't exist.
// =============================================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { products, formatPKR } from "@/app/lib/data";
import type { Product } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

// ====================== STAR RATING ======================
function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-600/70 text-sm tracking-[0.15em]" aria-label={`${rating} out of 5 stars`}>
      {"\u2605".repeat(Math.floor(rating))}
      {"\u2606".repeat(5 - Math.floor(rating))}
    </span>
  );
}

// ====================== TOAST ======================
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-full bg-[#9B2C2C] text-white text-sm font-medium shadow-[0_0_40px_rgba(155,44,44,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}

// ====================== HOOK: SCROLL REVEAL ======================
function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ====================== ANIMATED SECTION ======================
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? "translate-y-0 blur-0 opacity-100" : "translate-y-16 blur-md opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ====================== RELATED PRODUCT CARD ======================
/**
 * Smaller product card used in the "You May Also Like" section.
 * Has its own add-to-cart with inline toast (separate from the main toast).
 */
function RelatedProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const { ref, visible } = useScrollReveal(0.1);

  const handleAdd = useCallback(() => {
    addToCart(product);
    setToastMsg(`${product.name} added to cart\u2026`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, [addToCart, product]);

  const discount = product.isSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div
        ref={ref}
        className={`group transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          visible ? "translate-y-0 blur-0 opacity-100" : "translate-y-8 blur-sm opacity-0"
        }`}
      >
        <Link href={`/product/${product.id}`} className="block">
          <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F0EB]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                loading="lazy"
              />
              {product.isSale && (
                <span className="absolute top-3 left-3 bg-[#9B2C2C] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
                {product.category}
              </span>
              <h3 className="mt-1 font-medium text-sm leading-snug text-[#1A1A1A] truncate">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-bold text-[#1A1A1A]">{formatPKR(product.price)}</span>
                {product.isSale && (
                  <span className="text-sm text-zinc-400 line-through">{formatPKR(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 w-full rounded-full bg-[#1A1A1A] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
        >
          Quick Add
        </button>
      </div>
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}

// ====================== MAIN PAGE ======================

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [adding, setAdding] = useState(false);

  // -------- Image zoom state --------
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // -------- Add to cart with loading spinner --------
  const handleAdd = useCallback(async () => {
    if (!product) return;
    setAdding(true);
    addToCart(product, quantity);
    await new Promise((r) => setTimeout(r, 600)); // brief spinner for UX
    setToastMsg(`${quantity} \u00d7 ${product.name} added to cart\u2026`);
    setToastVisible(true);
    setAdding(false);
    setTimeout(() => setToastVisible(false), 2500);
  }, [addToCart, product, quantity]);

  // -------- Mouse-follow zoom lens --------
  // Tracks cursor position over the image and applies transform-origin for CSS scale(1.5)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const discount = product?.isSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Related products: same category, max 4, exclude current product
  const related = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // -------- 404 State --------
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium bg-[#C9A96E]/10 text-[#9B7E3A] mb-4">
            Error 404
          </span>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Product Not Found</h1>
          <p className="mt-3 text-zinc-500 text-sm">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#C9A96E]/30">

      {/* ======================== GRAIN OVERLAY ======================== */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
        aria-hidden="true"
      />

      {/* ======================== SIMPLE NAV ======================== */}
      {/* Minimal nav: logo + "Back to Home" link with glassmorphism. */}
      <nav className="sticky top-0 z-40 flex justify-center px-4">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 sm:px-8 h-16 md:h-[72px] bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          <Link href="/" className="text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] hover:opacity-80 transition-all duration-500">
            <span className="text-[#9B2C2C]">Rang</span>kar
          </Link>
          <Link href="/" className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5" aria-hidden="true">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* ======================== PRODUCT DETAIL SECTION ======================== */}
      {/* Two-column layout: image (zoom) on left, details (rating, price, qty, add-to-cart) on right. */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* -------- LEFT: Image with mouse-follow zoom -------- */}
            <div className="flex-1 lg:max-w-[55%]">
              <div
                ref={imageRef}
                className="relative rounded-2xl overflow-hidden bg-[#F5F0EB] aspect-[4/5] cursor-crosshair shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setZooming(true)}
                onMouseLeave={() => setZooming(false)}
                role="img"
                aria-label={product.name}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    zooming ? "scale-150" : "scale-100"
                  }`}
                  style={
                    zooming
                      ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } // Zoom follows cursor
                      : undefined
                  }
                  priority
                />
                {product.isSale && (
                  <span className="absolute top-4 left-4 bg-[#9B2C2C] text-white text-xs font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full z-10">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* -------- RIGHT: Product details -------- */}
            <div className="flex-1 lg:max-w-[45%] flex flex-col justify-center">
              <AnimatedSection>
                {/* Category label */}
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
                  {product.category}
                </span>

                {/* Product name */}
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#1A1A1A] leading-[1.1] text-pretty">
                  {product.name}
                </h1>

                {/* Stars */}
                <div className="mt-4 flex items-center gap-3">
                  <Stars rating={product.rating} />
                  <span className="text-sm text-zinc-400">({product.rating})</span>
                </div>

                {/* Price + sale savings */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#1A1A1A]">{formatPKR(product.price)}</span>
                  {product.isSale && (
                    <>
                      <span className="text-lg text-zinc-400 line-through">{formatPKR(product.originalPrice)}</span>
                      <span className="text-sm font-semibold text-[#9B2C2C]">Save {formatPKR(product.originalPrice - product.price)}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-zinc-500 text-pretty">
                  {product.description}
                </p>

                {/* -------- Quantity Selector -------- */}
                {/* Min: 1, Max: 99. Uses direct input + +/- buttons. */}
                <div className="mt-8">
                  <label htmlFor="quantity" className="text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400 mb-3 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-l-full border border-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F5F0EB] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
                      aria-label="Decrease quantity"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <div className="w-16 h-12 border-t border-b border-black/10 flex items-center justify-center">
                      <input
                        id="quantity"
                        type="number"
                        min={1}
                        max={99}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                        className="w-full text-center text-sm font-semibold bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      className="w-12 h-12 rounded-r-full border border-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F5F0EB] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
                      aria-label="Increase quantity"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M12 5v14" /><path d="M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* -------- Add to Cart button -------- */}
                {/* Shows loading spinner while adding, disabled during animation. */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={adding}
                  className="group mt-6 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {adding ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} opacity={0.3} />
                        <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                      Adding\u2026
                    </>
                  ) : (
                    <>
                      Add to Cart
                      <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>

                {/* -------- Trust badges -------- */}
                <div className="mt-6 flex items-center gap-4 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Free Shipping over PKR 5,000
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                    </svg>
                    Easy Returns
                  </span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== YOU MAY ALSO LIKE ======================== */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="mx-auto w-full max-w-6xl">
            <AnimatedSection>
              <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium bg-[#C9A96E]/10 text-[#9B7E3A] mb-3">
                Recommendations
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
                You May Also Like
              </h2>
            </AnimatedSection>

            {/* 4-column grid of related product cards */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global toast for add-to-cart confirmation */}
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
