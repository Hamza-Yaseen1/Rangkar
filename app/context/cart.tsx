// =============================================================================
// CART CONTEXT — GLOBAL CART STATE VIA REACT CONTEXT + LOCALSTORAGE PERSISTENCE
// =============================================================================
// Provides cart state and actions to every page.
// Cart data persists in localStorage under "shop-cart" and survives page reloads.
// =============================================================================

"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { Product } from "@/app/lib/data";

// Key used to store/retrieve cart data from the browser's localStorage
const STORAGE_KEY = "shop-cart";

/**
 * Safely loads cart data from localStorage.
 * Handles SSR (no window object), corrupted JSON, and invalid data shapes.
 * Returns a Record<productId, quantity> mapping.
 */
function loadCart(): Record<number, number> {
  if (typeof window === "undefined") return {}; // SSR guard — no localStorage on the server
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Validate shape: must be a plain object with positive integer values
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    for (const key of Object.keys(parsed)) {
      if (typeof parsed[key] !== "number" || parsed[key] < 1) return {};
    }
    return parsed as Record<number, number>;
  } catch {
    // JSON.parse failed — corrupted data; start fresh
    return {};
  }
}

// ====================== CONTEXT TYPE ======================

interface CartContextType {
  cart: Record<number, number>;         // { [productId]: quantity } — the actual cart data
  cartCount: number;                     // Total number of items across all products
  addToCart: (product: Product, quantity?: number) => void;  // Adds/increments quantity
  removeItem: (productId: number) => void;                   // Removes a product entirely
  updateQuantity: (productId: number, quantity: number) => void; // Sets exact quantity
  clearCart: () => void;                // Empties the entire cart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ====================== PROVIDER ======================

export function CartProvider({ children }: { children: ReactNode }) {
  // Start with empty object on the server — avoids hydration mismatch.
  // After mount, useEffect hydrates from localStorage.
  const [cart, setCart] = useState<Record<number, number>>({});

  // -------- Hydration: load from localStorage once on mount --------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(loadCart());
  }, []);

  // -------- Persistence: write to localStorage on every change --------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage quota exceeded or unavailable — silently fail
    }
  }, [cart]);

  // -------- Actions (memoized to avoid unnecessary re-renders) --------

  /** Adds a product (or increments by quantity). Default: +1. */
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + quantity,
    }));
  }, []);

  /** Removes every instance of a product from the cart. */
  const removeItem = useCallback((productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  /** Sets the exact quantity for a product (minimum: 1). */
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => ({ ...prev, [productId]: quantity }));
  }, []);

  /** Empties the cart entirely. */
  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  /** Derived value: total number of items (sum of all quantities). */
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ====================== HOOK ======================

/**
 * Hook to access cart state and actions from any component.
 * Must be used within a <CartProvider> — throws an error otherwise.
 * Usage: const { cart, addToCart, cartCount } = useCart();
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
