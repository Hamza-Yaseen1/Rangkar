"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { products, formatPKR } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

function CartItem({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) return null;

  const subtotal = product.price * quantity;
  const discount = product.isSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5">
        {/* Image */}
        <Link href={`/product/${product.id}`} className="relative w-full sm:w-24 h-28 sm:h-28 rounded-xl overflow-hidden bg-[#F5F0EB] shrink-0">
          <Image
            src={`https://picsum.photos/id/${product.imageId}/200/250`}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
          {product.isSale && (
            <span className="absolute top-1.5 left-1.5 bg-[#9B2C2C] text-white text-[8px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
              {product.category}
            </span>
            <Link
              href={`/product/${product.id}`}
              className="mt-0.5 block text-sm font-medium text-[#1A1A1A] truncate hover:text-[#C9A96E] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">{formatPKR(product.price)}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={() => {
                if (quantity <= 1) {
                  removeItem(product.id);
                } else {
                  updateQuantity(product.id, quantity - 1);
                }
              }}
              className="w-9 h-9 rounded-l-full border border-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F5F0EB] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
              aria-label="Decrease quantity"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <div className="w-12 h-9 border-t border-b border-black/10 flex items-center justify-center">
              <span className="text-xs font-semibold">{quantity}</span>
            </div>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-9 h-9 rounded-r-full border border-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F5F0EB] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
              aria-label="Increase quantity"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right sm:w-24 shrink-0">
            <p className="text-sm font-bold text-[#1A1A1A]">{formatPKR(subtotal)}</p>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="p-2 rounded-full text-zinc-300 hover:text-[#9B2C2C] hover:bg-red-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
            aria-label={`Remove ${product.name}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, cartCount, clearCart } = useCart();

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ id: Number(id), quantity: qty }))
        .filter((item) => item.quantity > 0),
    [cart],
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [cartItems],
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#C9A96E]/30">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
        aria-hidden="true"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-40 flex justify-center px-4">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 h-16 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#1A1A1A]">
            <span className="text-[#9B2C2C]">Rang</span>kar
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[12px] font-medium uppercase tracking-[0.12em] text-zinc-500">
            <Link href="/" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]">
              Home
            </Link>
            <Link href="/shop" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]">
              Shop
            </Link>
            <Link href="/sale" className="text-[#9B2C2C] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#C9A96E]">
              Sale
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-zinc-400" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#9B2C2C] text-white text-[8px] font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">

          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 sm:py-32 max-w-md mx-auto">
              <div className="mx-auto w-20 h-20 rounded-full bg-[#F5F0EB] flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-zinc-300" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#1A1A1A]">Your Cart is Empty</h1>
              <p className="mt-3 text-sm text-zinc-400">
                Looks like you haven&apos;t added anything yet. Discover premium Pakistani fashion that speaks to you.
              </p>
              <Link
                href="/"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98]"
              >
                Continue Shopping
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium bg-[#C9A96E]/10 text-[#9B7E3A] mb-2">
                    Your Cart
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
                    Shopping Cart
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-400 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#9B2C2C]"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} id={item.id} quantity={item.quantity} />
                  ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8 sticky top-24">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-5">
                      Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
                        <span className="font-medium text-[#1A1A1A]">{formatPKR(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Shipping</span>
                        <span className="text-zinc-400 text-[12px]">Calculated at checkout</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-black/5">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#1A1A1A]">Total</span>
                        <span className="text-xl font-bold text-[#1A1A1A]">{formatPKR(subtotal)}</span>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="group mt-6 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98]"
                    >
                      Proceed to Checkout
                      <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>

                    <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Secure
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Free over PKR&nbsp;5,000
                      </span>
                    </div>

                    <Link
                      href="/"
                      className="mt-4 block text-center text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-400 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
