"use client";

import Link from "next/link";
import { useState } from "react";
import { MOROCCAN_CITIES } from "@/lib/vehicle-data";
import { useSelectedCity } from "@/lib/use-city";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/search", label: "Pièces" },
  { href: "/#categories", label: "Catégories" },
  { href: "/shops", label: "Magasins" },
  { href: "/#how-it-works", label: "Comment ça marche" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [city, setCity] = useSelectedCity();

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
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-surface-600 hover:text-surface-900 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City selector */}
            <div className="hidden md:block">
              <label htmlFor="header-city" className="sr-only">
                Ville
              </label>
              <select
                id="header-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-lg border border-surface-200 bg-white py-2 pl-3 pr-8 text-sm text-surface-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {MOROCCAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Search shortcut */}
            <Link
              href="/search"
              aria-label="Rechercher une pièce"
              className="inline-flex items-center justify-center rounded-lg p-2 text-surface-600 hover:bg-surface-100 hover:text-surface-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </Link>

            <Link
              href="/seller/register"
              className="hidden sm:inline-flex btn-accent text-sm"
            >
              Vendre sur AutoParts
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
          <div id="mobile-nav" className="lg:hidden border-t border-surface-200 py-4">
            <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-700 hover:bg-surface-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 px-3">
                <label htmlFor="mobile-city" className="block text-xs font-medium text-surface-500 mb-1.5">
                  Ville
                </label>
                <select
                  id="mobile-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-surface-200 py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 px-3">
                <Link
                  href="/seller/register"
                  className="btn-accent w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Vendre sur AutoParts
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
