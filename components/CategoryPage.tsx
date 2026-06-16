"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { products, formatPKR } from "@/app/lib/data";
import type { Product } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

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

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-600/70 text-xs tracking-[0.15em]" aria-label={`${rating} out of 5 stars`}>
      {"\u2605".repeat(Math.floor(rating))}
      {"\u2606".repeat(5 - Math.floor(rating))}
    </span>
  );
}

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

function IconCart({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      aria-label={`View cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
      className="relative p-2 rounded-full hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#9B2C2C] text-white text-[10px] font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}

function IconUser() {
  return (
    <button type="button" aria-label="User account" className="p-2 rounded-full hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" aria-hidden="true">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 00-16 0" />
      </svg>
    </button>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const { ref, visible } = useScrollReveal(0.05);
  const discount = product.isSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      ref={ref}
      className={`group transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? "translate-y-0 blur-0 opacity-100" : "translate-y-12 blur-sm opacity-0"
      }`}
    >
      <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F0EB]">
          <Image
            src={`https://picsum.photos/id/${product.imageId}/400/500`}
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-full rounded-full bg-white/95 backdrop-blur-sm px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A] transition-all duration-300 hover:bg-[#C9A96E] hover:text-white active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
            {product.category}
          </span>
          <h3 className="mt-1 font-medium text-sm leading-snug text-[#1A1A1A] truncate">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[10px] text-zinc-400">({product.rating})</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-[#1A1A1A]">{formatPKR(product.price)}</span>
            {product.isSale && (
              <span className="text-sm text-zinc-400 line-through">{formatPKR(product.originalPrice)}</span>
            )}
          </div>
          <Link
            href={`/product/${product.id}`}
            className="mt-3 block w-full rounded-full border border-black/10 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500 text-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F5F0EB] hover:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  title: string;
  subtitle: string;
  category?: Product["category"];
  isSale?: boolean;
  bannerImageId?: number;
}

export default function CategoryPage({
  title,
  subtitle,
  category,
  isSale,
  bannerImageId = 30,
}: CategoryPageProps) {
  const { addToCart: addToCartCtx, cartCount } = useCart();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      addToCartCtx(product);
      showToast(`${product.name} added to cart\u2026`);
    },
    [addToCartCtx, showToast],
  );

  const filteredProducts = useMemo(
    () => products.filter((p) => {
      if (isSale) return p.isSale === true;
      if (category) return p.category === category;
      return true;
    }),
    [category, isSale],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#C9A96E]/30">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
        aria-hidden="true"
      />

      {/* Announcement Bar */}
      <div className="relative z-50 bg-[#1A1A1A] text-white text-center text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] py-2.5 px-4">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          Summer Sale &mdash; Up to 50% OFF &mdash; Limited Time
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
        </span>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 flex justify-center px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 h-16 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm">
          <Link
            href="/"
            className={`text-lg font-bold tracking-tight text-[#1A1A1A] transition-all duration-500 ${menuOpen ? "opacity-0 pointer-events-none" : ""}`}
            tabIndex={menuOpen ? -1 : 0}
          >
            <span className="text-[#9B2C2C]">Rang</span>kar
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[12px] font-medium uppercase tracking-[0.12em] text-zinc-500">
            <Link href="/" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]" tabIndex={menuOpen ? -1 : 0}>Home</Link>
            <Link href="/sale" className={`transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#C9A96E] ${isSale ? "text-[#9B2C2C]" : "text-zinc-500 hover:text-[#1A1A1A]"}`} tabIndex={menuOpen ? -1 : 0}>Sale</Link>
            <Link href="/unstitched" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]" tabIndex={menuOpen ? -1 : 0}>Unstitched</Link>
            <Link href="/ready-to-wear" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]" tabIndex={menuOpen ? -1 : 0}>Ready to Wear</Link>
            <Link href="/men" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]" tabIndex={menuOpen ? -1 : 0}>Men</Link>
            <Link href="/beauty" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]" tabIndex={menuOpen ? -1 : 0}>Beauty</Link>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
              tabIndex={menuOpen ? -1 : 0}
            >
              <IconSearch />
            </button>
            <IconCart count={cartCount} />
            <IconUser />

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative ml-1 p-2.5 rounded-full hover:bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
            >
              <div className="relative w-[18px] h-[18px] flex items-center justify-center">
                <span className={`absolute block h-[1.5px] w-[18px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"}`} />
                <span className={`absolute block h-[1.5px] w-[18px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`} />
                <span className={`absolute block h-[1.5px] w-[18px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-30 flex items-start justify-center pt-24 sm:pt-28 px-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl ring-1 ring-black/10 shadow-xl overflow-hidden">
            <input
              ref={searchRef}
              type="search"
              name="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search products\u2026"
              aria-label="Search products"
              className="w-full bg-transparent px-6 py-4 text-sm text-[#1A1A1A] placeholder-zinc-400 outline-none"
            />
          </div>
        </div>
        <button type="button" aria-label="Close search" className="absolute inset-0 -z-10" onClick={() => setSearchOpen(false)} />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-10 backdrop-blur-3xl bg-[#FDFBF7]/95 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {["Home", "Sale", "Unstitched", "Ready to Wear", "Men", "Beauty"].map((label, i) => (
          <Link
            key={label}
            href={label === "Home" ? "/" : `/${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setMenuOpen(false)}
            className={`text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1A1A] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#C9A96E] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? `${150 + i * 100}ms` : "0ms" }}
          >
            {label === "Sale" ? <span className="text-[#9B2C2C]">{label}</span> : label}
          </Link>
        ))}
      </div>

      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="mx-auto w-full max-w-6xl">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-400" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]">Home</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-[#1A1A1A]">{title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl">
          <AnimatedSection>
            <div className={`relative rounded-2xl overflow-hidden ${isSale ? "bg-gradient-to-r from-[#9B2C2C] to-[#7A1F1F]" : "bg-gradient-to-r from-[#1A1A1A] to-[#333]"} px-8 py-12 sm:py-16`}>
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white blur-[80px]" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#C9A96E] blur-[60px]" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                <div className="flex-1 text-center sm:text-left">
                  <span className={`inline-block rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold mb-4 ${isSale ? "bg-white/10 text-white/80" : "bg-[#C9A96E]/10 text-[#C9A96E]"}`}>
                    {isSale ? "Limited Offer" : "Collection"}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
                    {title}
                  </h1>
                  <p className="mt-3 text-white/70 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
                    {subtitle}
                  </p>
                  <p className="mt-2 text-white/50 text-xs">
                    {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-white/10 shrink-0 ring-1 ring-white/10">
                  <Image
                    src={`https://picsum.photos/id/${bannerImageId}/200/200`}
                    alt={title}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8" id="products">
        <div className="mx-auto w-full max-w-6xl">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#F5F0EB] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-zinc-300" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-zinc-400 text-sm">No products found in this category.</p>
              <Link
                href="/"
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98]"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Free Shipping", desc: "On orders over PKR 5,000" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Easy Returns", desc: "14-day return policy" },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Secure Payment", desc: "100% secure checkout" },
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Nationwide", desc: "Delivery across Pakistan" },
            ].map((feature) => (
              <div key={feature.label} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#F5F0EB] flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#9B2C2C]" aria-hidden="true">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-[#1A1A1A]">{feature.label}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-zinc-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-bold text-white">
                <span className="text-[#C9A96E]">Rang</span>kar
              </span>
              <p className="mt-3 text-sm text-zinc-500 max-w-xs">
                Premium Pakistani fashion since 2025. Unstitched, ready-to-wear, and beauty essentials crafted for elegance.
              </p>
            </div>
            {[
              { title: "Shop", links: ["Sale", "Unstitched", "Ready to Wear", "Men", "Beauty"] },
              { title: "Support", links: ["Contact Us", "Shipping", "Returns", "FAQ"] },
              { title: "Company", links: ["About Us", "Careers", "Privacy Policy", "Terms"] },
            ].map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link href="/" className="text-sm text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#C9A96E]">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <span>&copy; {new Date().getFullYear()} Rangkar. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span>Made with care in Pakistan</span>
            </div>
          </div>
        </div>
      </footer>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
