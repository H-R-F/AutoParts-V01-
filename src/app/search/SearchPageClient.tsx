"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchFilters } from "@/components/search/SearchFilters";

export function SearchPageClient() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "relevance";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "relevance") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile filters button */}
      <button
        type="button"
        onClick={() => setFiltersOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-3 py-2 text-sm font-medium text-surface-700 shadow-sm hover:bg-surface-50"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
        Filtres
      </button>

      {/* Sort (client version for proper URL updates) */}
      <div className="hidden sm:flex items-center gap-2">
        <label htmlFor="sort-client" className="text-sm text-surface-600 whitespace-nowrap">
          Trier par
        </label>
        <select
          id="sort-client"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input-field py-2 text-sm w-auto"
        >
          <option value="relevance">Pertinence</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-surface-900/50"
            onClick={() => setFiltersOpen(false)}
          />

          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-surface-200 px-4 py-4">
              <h2 className="text-lg font-semibold text-surface-900">Filtres</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-lg p-2 text-surface-500 hover:bg-surface-100"
                aria-label="Fermer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SearchFilters isMobile onClose={() => setFiltersOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
