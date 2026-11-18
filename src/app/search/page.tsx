import { Suspense } from "react";
import Link from "next/link";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { ProductCard } from "@/components/search/ProductCard";
import { SearchFilters } from "@/components/search/SearchFilters";
import { HomeSearch } from "@/components/search/HomeSearch";
import { SearchPageClient } from "./SearchPageClient";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: "Recherche de pièces",
  description: "Trouvez des pièces détachées automobiles au Maroc. Comparez les offres des magasins locaux.",
};

function filterProducts(params: { [key: string]: string | string[] | undefined }) {
  let results = [...DEMO_PRODUCTS];

  const q = typeof params.q === "string" ? params.q.toLowerCase().trim() : "";
  const city = typeof params.city === "string" ? params.city : "";
  const category = typeof params.category === "string" ? params.category : "";
  const brand = typeof params.brand === "string" ? params.brand : "";
  const condition = typeof params.condition === "string" ? params.condition : "";
  const verified = params.verified === "1";
  const sort = typeof params.sort === "string" ? params.sort : "relevance";

  if (q) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.oemReference?.toLowerCase().includes(q) ||
        p.manufacturerReference?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shopName.toLowerCase().includes(q)
    );
  }

  if (city) {
    results = results.filter((p) => p.shopCity === city);
  }
  if (category) {
    results = results.filter((p) => p.category === category);
  }
  if (brand) {
    results = results.filter((p) => p.brand === brand);
  }
  if (condition) {
    results = results.filter((p) => p.condition === condition);
  }
  if (verified) {
    results = results.filter((p) => p.shopVerification === "verified");
  }

  // Sorting
  if (sort === "price_asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    results.sort((a, b) => b.price - a.price);
  } else {
    // Relevance: sponsored first, then others
    results.sort((a, b) => {
      if (a.isSponsored && !b.isSponsored) return -1;
      if (!a.isSponsored && b.isSponsored) return 1;
      return 0;
    });
  }

  return results;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const fromImage = params.via === "image";
  const products = filterProducts(params);

  // Same search as the homepage, pre-filled from the URL.
  const initial = {
    q: firstParam(params.q),
    city: firstParam(params.city),
    type: firstParam(params.type),
    make: firstParam(params.make),
    model: firstParam(params.model),
    year: firstParam(params.year),
    engine: firstParam(params.engine),
  };

  return (
    <div className="bg-surface-50 min-h-screen">
      {/* Search (same component as the homepage) */}
      <div className="border-b border-surface-200 bg-white">
        <div className="container-main py-5">
          <HomeSearch
            key={JSON.stringify(initial)}
            variant="page"
            initial={initial}
          />
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="card p-5 sticky top-24">
              <Suspense fallback={<div className="animate-pulse h-64 bg-surface-100 rounded" />}>
                <SearchFilters />
              </Suspense>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-surface-900">
                  {q ? (
                    <>
                      Résultats pour « {q} »
                    </>
                  ) : (
                    "Toutes les pièces"
                  )}
                </h1>
                <p className="mt-1 text-sm text-surface-600">
                  {products.length} résultat{products.length !== 1 ? "s" : ""}
                  <span className="ml-2 text-xs text-surface-400">
                    (données de démonstration)
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filters + Sort handled in Client Component */}
                <Suspense fallback={null}>
                  <SearchPageClient />
                </Suspense>
              </div>
            </div>

            {fromImage && q && (
              <div className="mb-6 rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-900">
                <strong>Recherche par photo.</strong> Pièce identifiée : « {q} ».
                Cette identification est indicative — vérifiez la référence et la
                compatibilité avec le vendeur.
              </div>
            )}

            {/* Demo notice */}
            <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
              <strong>Mode démonstration.</strong> Les produits, prix et magasins affichés sont fictifs et servent uniquement à illustrer l’interface.
            </div>

            {/* Results grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-100">
                  <svg className="h-8 w-8 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-surface-900">
                  Aucun résultat trouvé
                </h2>
                <p className="mt-2 text-sm text-surface-600 max-w-md mx-auto">
                  Essayez de modifier votre recherche, d’enlever des filtres, ou de chercher par référence OEM.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/search" className="btn-secondary">
                    Voir toutes les pièces
                  </Link>
                  <Link href="/" className="btn-primary">
                    Retour à l’accueil
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
