"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import {
  DEMO_CITIES,
  DEMO_CATEGORIES,
  DEMO_BRANDS,
  CONDITION_LABELS,
} from "@/lib/demo-data";
import type { ProductCondition } from "@/lib/types";

interface SearchFiltersProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function SearchFilters({ isMobile = false, onClose }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCity = searchParams.get("city") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentCondition = searchParams.get("condition") || "";
  const currentVerified = searchParams.get("verified") === "1";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Keep the query
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
      if (isMobile && onClose) onClose();
    },
    [searchParams, pathname, router, isMobile, onClose]
  );

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
    if (isMobile && onClose) onClose();
  };

  const hasActiveFilters =
    currentCity || currentCategory || currentBrand || currentCondition || currentVerified;

  return (
    <div className={`space-y-6 ${isPending ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-surface-900">Filtres</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            Effacer tout
          </button>
        )}
      </div>

      {/* City */}
      <div>
        <label className="label mb-2">Ville</label>
        <select
          value={currentCity}
          onChange={(e) => updateParam("city", e.target.value)}
          className="input-field"
        >
          <option value="">Tout le Maroc</option>
          {DEMO_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="label mb-2">Catégorie</label>
        <select
          value={currentCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="input-field"
        >
          <option value="">Toutes</option>
          {DEMO_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="label mb-2">Marque</label>
        <select
          value={currentBrand}
          onChange={(e) => updateParam("brand", e.target.value)}
          className="input-field"
        >
          <option value="">Toutes</option>
          {DEMO_BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="label mb-2">État</label>
        <div className="space-y-2">
          {(["new", "used", "refurbished"] as ProductCondition[]).map((cond) => (
            <label key={cond} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condition"
                checked={currentCondition === cond}
                onChange={() => updateParam("condition", cond)}
                className="h-4 w-4 border-surface-300 text-brand-600 focus:ring-brand-600"
              />
              <span className="text-sm text-surface-700">{CONDITION_LABELS[cond]}</span>
            </label>
          ))}
          {currentCondition && (
            <button
              type="button"
              onClick={() => updateParam("condition", "")}
              className="text-xs text-surface-500 hover:text-surface-700"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Verified only */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentVerified}
            onChange={(e) => updateParam("verified", e.target.checked ? "1" : "")}
            className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-600"
          />
          <span className="text-sm text-surface-700">Vendeurs vérifiés uniquement</span>
        </label>
      </div>
    </div>
  );
}
