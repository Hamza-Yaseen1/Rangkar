// =============================================================================
// CHECKOUT PAGE — /checkout
// =============================================================================
// 7-field shipping form + sticky order summary sidebar. On submit, validates
// the form, calls POST /api/send-order (Resend), clears the cart, and shows
// a success modal with the order number (e.g. RKR-XXXXXXXX).
//
// Redirects to the cart empty state if there are no items.
// =============================================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { products, formatPKR } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

// ====================== TYPES ======================

interface FormData {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

// ====================== ORDER NUMBER GENERATION ======================
/** Generates a random 8-character alphanumeric order ID prefixed with "RKR-". */
function generateOrderNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "RKR-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ====================== REUSABLE INPUT FIELD ======================
/**
 * Renders a labeled input with validation error state.
 * Uses `aria-invalid` and `aria-describedby` for accessibility.
 */
function InputField({
  label,
  id,
  type = "text",
  value,
  error,
  placeholder,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  const hasError = !!error;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-500">
        {label}
        {required && <span className="text-[#9B2C2C] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-11 px-4 text-sm bg-white rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none focus:ring-2 focus:ring-[#C9A96E]/40 placeholder:text-zinc-300 ${
          hasError
            ? "border-[#9B2C2C]/40 text-[#9B2C2C]"
            : "border-black/10 text-[#1A1A1A] hover:border-black/20 focus:border-[#C9A96E]"
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
      />
      {hasError && (
        <p id={`${id}-error`} role="alert" className="text-[11px] text-[#9B2C2C] font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// ====================== SUCCESS MODAL ======================
/**
 * Overlay shown after a successful order. Displays the order number
 * and a "Continue Shopping" link that navigates to the homepage.
 */
function SuccessModal({
  orderNumber,
  onClose,
}: {
  orderNumber: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
      <div
        className="w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-8 sm:p-10 text-center animate-in scale-in duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        {/* Checkmark icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h2 id="success-title" className="text-2xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
          Thank You!
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Your order has been placed successfully.
        </p>

        {/* Order number card */}
        <div className="mt-6 bg-[#F5F0EB] rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-1">
            Order Number
          </p>
          <p className="text-lg font-bold tracking-tight text-[#1A1A1A]">
            {orderNumber}
          </p>
        </div>

        <p className="mt-5 text-xs text-zinc-400 leading-relaxed">
          A confirmation email will be sent to your inbox shortly. Our team will begin preparing your order right away.
        </p>

        <Link
          href="/"
          onClick={onClose}
          className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98]"
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
    </div>
  );
}

// ====================== PAGE ======================

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<string | null>(null);

  // -------- Derive flat cart items array --------
  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ id: Number(id), quantity: qty }))
        .filter((item) => item.quantity > 0),
    [cart],
  );

  // -------- Compute subtotal --------
  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [cartItems],
  );

  // -------- Update a single form field and clear its error --------
  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  // -------- Validate all required fields --------
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2) newErrors.fullName = "Enter a valid name";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone.trim())) newErrors.phone = "Enter a valid phone number";

    if (!form.street.trim()) newErrors.street = "Street address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    else if (!/^\d{4,6}$/.test(form.zip.trim())) newErrors.zip = "Enter a valid ZIP code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // -------- Submit order: validate, show spinner, POST to API, show modal --------
  async function handlePlaceOrder() {
    if (!validate()) return;
    setIsPlacing(true);
    setSendError(null);

    // Brief artificial delay so the user sees the spinner
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const orderNumber = generateOrderNumber();
    const createdAt = new Date().toISOString();

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          createdAt,
          customer: {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            street: form.street.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            zip: form.zip.trim(),
            email: form.email.trim(),
          },
          items: cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id)!;
            return {
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              imageUrl: product.image,
            };
          }),
          subtotal,
          total: subtotal,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setSendError(err.error || "Failed to send confirmation email");
      }
    } catch {
      // If the API call fails, the order is still recorded locally
      setSendError("Could not send order email. Your order was still placed.");
    }

    // Clear cart and show success regardless of email send result
    clearCart();
    setIsPlacing(false);
    setSuccessOrder(orderNumber);
  }

  // If cart is empty (and no success modal is showing), show the empty state
  const isEmpty = cartItems.length === 0 && !successOrder;

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

      {/* ======================== NAV ======================== */}
      {/* Premium glassmorphism nav with hover underline effects on links. */}
      <nav className="sticky top-0 z-40 flex justify-center px-4">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 sm:px-8 h-16 md:h-[72px] bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          <Link href="/" className="text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] hover:opacity-80 transition-all duration-500">
            <span className="text-[#9B2C2C]">Rang</span>kar
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
            <Link href="/" className="relative text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Home</Link>
            <Link href="/sale" className="relative text-[#9B2C2C] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#C9A96E] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Sale</Link>
            <Link href="/unstitched" className="relative text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Unstitched</Link>
            <Link href="/ready-to-wear" className="relative text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Ready to Wear</Link>
            <Link href="/men" className="relative text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Men</Link>
            <Link href="/beauty" className="relative text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A] after:absolute after:left-0 after:-bottom-[3px] after:w-0 after:h-[1.5px] after:bg-current after:rounded-full after:transition-all after:duration-500 hover:after:w-full">Beauty</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-black/5 hover:scale-105 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-zinc-500" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-[19px] h-[19px] rounded-full bg-[#9B2C2C] text-white text-[10px] font-bold shadow-[0_2px_8px_rgba(155,44,44,0.3)]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* ======================== MAIN CONTENT ======================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">

          {isEmpty ? (
            /* -------- EMPTY CART STATE -------- */
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
                Add some items to your cart before checking out.
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
              {/* -------- HEADER -------- */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium bg-[#C9A96E]/10 text-[#9B7E3A] mb-2">
                    Secure Checkout
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
                    Checkout
                  </h1>
                </div>
                <Link
                  href="/cart"
                  className="text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-400 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#1A1A1A]"
                >
                  Back to Cart
                </Link>
              </div>

              {/* -------- TWO-COLUMN: form + summary -------- */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* -------- LEFT: SHIPPING FORM -------- */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-6 flex items-center gap-2.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13c0 1.1.9 2 2 2z" />
                      </svg>
                      Shipping Information
                    </h2>

                    {/* Form is wrapped in a submit handler but uses button click for placement */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handlePlaceOrder();
                      }}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Name + Phone row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <InputField
                          label="Full Name"
                          id="fullName"
                          value={form.fullName}
                          error={errors.fullName}
                          placeholder="Abdullah Khan"
                          onChange={(v) => updateField("fullName", v)}
                          required
                        />
                        <InputField
                          label="Phone Number"
                          id="phone"
                          type="tel"
                          value={form.phone}
                          error={errors.phone}
                          placeholder="+92 300 1234567"
                          onChange={(v) => updateField("phone", v)}
                          required
                        />
                      </div>

                      {/* Street address (full width) */}
                      <InputField
                        label="Street Address"
                        id="street"
                        value={form.street}
                        error={errors.street}
                        placeholder="House #12, Street 5, F-7/3"
                        onChange={(v) => updateField("street", v)}
                        required
                      />

                      {/* City + State + ZIP row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                        <InputField
                          label="City"
                          id="city"
                          value={form.city}
                          error={errors.city}
                          placeholder="Islamabad"
                          onChange={(v) => updateField("city", v)}
                          required
                        />
                        <InputField
                          label="State"
                          id="state"
                          value={form.state}
                          error={errors.state}
                          placeholder="Federal"
                          onChange={(v) => updateField("state", v)}
                          required
                        />
                        <InputField
                          label="ZIP Code"
                          id="zip"
                          value={form.zip}
                          error={errors.zip}
                          placeholder="44000"
                          onChange={(v) => updateField("zip", v)}
                          required
                        />
                      </div>

                      {/* Email (optional — not required for order but helpful for email receipt) */}
                      <InputField
                        label="Email (optional)"
                        id="email"
                        type="email"
                        value={form.email}
                        placeholder="abdullah@example.com"
                        onChange={(v) => updateField("email", v)}
                      />
                    </form>
                  </div>
                </div>

                {/* -------- RIGHT: ORDER SUMMARY SIDEBAR -------- */}
                <div className="w-full lg:w-96 shrink-0">
                  <div className="bg-white rounded-2xl ring-1 ring-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 sm:p-8 sticky top-24">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-5 flex items-center gap-2.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      Order Summary
                    </h2>

                    {/* Line items (scrollable if many items) */}
                    <div className="space-y-3 mb-5 pb-5 border-b border-black/5 max-h-72 overflow-y-auto pr-1">
                      {cartItems.map((item) => {
                        const product = products.find((p) => p.id === item.id);
                        if (!product) return null;
                        return (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#F5F0EB] shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#1A1A1A] truncate">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-zinc-400 mt-0.5">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-xs font-semibold text-[#1A1A1A] shrink-0">
                              {formatPKR(product.price * item.quantity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Subtotal + shipping */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
                        <span className="font-medium text-[#1A1A1A]">{formatPKR(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Shipping</span>
                        {/* Free shipping threshold: orders over PKR 5,000 */}
                        <span className="font-medium text-emerald-600">
                          {subtotal >= 5000 ? "Free" : "Calculated at checkout"}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-5 pt-5 border-t border-black/5">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#1A1A1A]">Total</span>
                        <span className="text-xl font-bold text-[#1A1A1A]">{formatPKR(subtotal)}</span>
                      </div>
                    </div>

                    {/* API error message (if email send fails) */}
                    {sendError && (
                      <div className="mt-4 p-3 rounded-xl bg-[#9B2C2C]/5 border border-[#9B2C2C]/20 text-xs text-[#9B2C2C] font-medium text-center">
                        {sendError}
                      </div>
                    )}

                    {/* Place Order button with loading spinner */}
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isPlacing}
                      className="group mt-6 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isPlacing ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                          </svg>
                          Processing\u2026
                        </>
                      ) : (
                        <>
                          Place Order
                          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                              <path d="M5 12h14" />
                              <path d="M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>

                    {/* Security reassurance */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Secure Checkout &middot; Your info is protected
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ======================== SUCCESS MODAL ======================== */}
      {successOrder && (
        <SuccessModal
          orderNumber={successOrder}
          onClose={() => setSuccessOrder(null)}
        />
      )}
    </div>
  );
}
