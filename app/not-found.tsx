import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium bg-[#C9A96E]/10 text-[#9B7E3A] mb-4">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
          Page Not Found
        </h1>
        <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Browse our latest collections below.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-all duration-700 hover:bg-[#9B2C2C] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
          >
            Back to Home
          </Link>
          <Link
            href="/sale"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-zinc-500 transition-all duration-700 hover:bg-[#F5F0EB] hover:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#C9A96E] outline-none"
          >
            Shop Sale
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 text-left">
          {[
            { href: "/unstitched", label: "Unstitched" },
            { href: "/ready-to-wear", label: "Ready to Wear" },
            { href: "/men", label: "Men" },
            { href: "/beauty", label: "Beauty" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl bg-white ring-1 ring-black/5 p-4 text-sm font-medium text-[#1A1A1A] transition-all duration-500 hover:shadow-md hover:ring-[#C9A96E]/30"
            >
              {link.label}
              <span className="block text-[10px] text-zinc-400 mt-0.5 uppercase tracking-[0.1em]">
                Shop Collection
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
