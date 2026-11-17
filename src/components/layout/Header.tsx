"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-main">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-surface-900">
              AutoParts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/search"
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition"
            >
              Rechercher
            </Link>
            <Link
              href="/shops"
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition"
            >
              Magasins
            </Link>
            <Link
              href="/seller/register"
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition"
            >
              Devenir vendeur
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/seller/register"
              className="hidden sm:inline-flex btn-primary text-sm"
            >
              Inscription vendeur
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Ouvrir le menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden border-t border-surface-200 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/search"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-700 hover:bg-surface-100"
                onClick={() => setMobileOpen(false)}
              >
                Rechercher
              </Link>
              <Link
                href="/shops"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-700 hover:bg-surface-100"
                onClick={() => setMobileOpen(false)}
              >
                Magasins
              </Link>
              <Link
                href="/seller/register"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-700 hover:bg-surface-100"
                onClick={() => setMobileOpen(false)}
              >
                Devenir vendeur
              </Link>
              <div className="mt-3 px-3">
                <Link
                  href="/seller/register"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Inscription vendeur
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
