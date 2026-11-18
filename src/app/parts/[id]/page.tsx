import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DEMO_PRODUCTS, CONDITION_LABELS } from "@/lib/demo-data";
import { ProductCard } from "@/components/search/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: `${product.name} — ${product.brand || "Pièce"}`,
    description: `${product.name}${product.oemReference ? ` (OEM ${product.oemReference})` : ""} chez ${product.shopName}, ${product.shopCity}. Prix : ${product.price} DH.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const similar = DEMO_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const whatsappLink = product.shopWhatsapp
    ? `https://wa.me/${product.shopWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Bonjour, je suis intéressé par : ${product.name}${product.oemReference ? ` (réf. ${product.oemReference})` : ""} — ${product.price} DH`
      )}`
    : null;

  const phoneLink = product.shopPhone ? `tel:${product.shopPhone}` : null;
  const imageUrl = product.images?.[0];

  return (
    <div className="bg-surface-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-surface-200 bg-white">
        <div className="container-main py-3">
          <nav className="flex items-center gap-2 text-sm text-surface-500">
            <Link href="/" className="hover:text-surface-800 transition">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/search" className="hover:text-surface-800 transition">
              Recherche
            </Link>
            <span>/</span>
            <span className="text-surface-800 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-100 ring-1 ring-surface-200">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-surface-300">
                  <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isSponsored && (
                  <span className="inline-flex items-center rounded-md bg-accent-500/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                    Sponsorisé
                  </span>
                )}
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    product.condition === "new"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                      : product.condition === "refurbished"
                      ? "bg-sky-50 text-sky-700 ring-1 ring-sky-600/20"
                      : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  }`}
                >
                  {CONDITION_LABELS[product.condition]}
                </span>
              </div>
            </div>

            <p className="text-xs text-surface-400 text-center">
              Image de démonstration — ne représente pas nécessairement le produit exact
            </p>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Brand + Category */}
            <div className="flex items-center gap-3 text-sm">
              {product.brand && (
                <span className="font-medium text-surface-600">{product.brand}</span>
              )}
              <span className="text-surface-300">·</span>
              <Link
                href={`/search?category=${encodeURIComponent(product.category)}`}
                className="text-brand-600 hover:text-brand-700 transition"
              >
                {product.category}
              </Link>
            </div>

            {/* Name */}
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
              {product.name}
            </h1>

            {/* References */}
            {(product.oemReference || product.manufacturerReference) && (
              <div className="mt-4 rounded-xl bg-surface-100 px-4 py-3 space-y-1.5">
                {product.oemReference && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-surface-500 w-28 shrink-0">Réf. OEM</span>
                    <span className="font-mono font-medium text-surface-900">
                      {product.oemReference}
                    </span>
                  </div>
                )}
                {product.manufacturerReference && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-surface-500 w-28 shrink-0">Réf. fabricant</span>
                    <span className="font-mono font-medium text-surface-900">
                      {product.manufacturerReference}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-surface-900">
                {product.price.toLocaleString("fr-MA")}
              </span>
              <span className="text-lg font-medium text-surface-500">DH</span>
            </div>

            {product.stock !== undefined && (
              <p className="mt-1 text-sm text-surface-500">
                {product.stock > 0
                  ? `Disponible · Stock indicatif : ${product.stock}`
                  : "Rupture de stock (selon le vendeur)"}
              </p>
            )}

            {/* Contact actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#20bd5a]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contacter sur WhatsApp
                </a>
              )}
              {phoneLink && (
                <a
                  href={phoneLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-surface-800"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Appeler
                </a>
              )}
            </div>

            {/* Seller card */}
            <div className="mt-8 rounded-2xl border border-surface-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-surface-500">
                    Vendu par
                  </p>
                  <Link
                    href={`/shops/${product.shopSlug}`}
                    className="mt-1 block text-lg font-semibold text-surface-900 hover:text-brand-700 transition"
                  >
                    {product.shopName}
                  </Link>
                  <p className="mt-0.5 text-sm text-surface-600">{product.shopCity}</p>
                </div>

                {product.shopVerification === "verified" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vérifié
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600">
                    Non vérifié
                  </span>
                )}
              </div>

              <Link
                href={`/shops/${product.shopSlug}`}
                className="mt-4 inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 transition"
              >
                Voir le magasin →
              </Link>
            </div>

            {/* Compatibility note */}
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-900">
                <strong>Compatibilité :</strong>{" "}
                {product.compatibilitySource === "seller_provided"
                  ? "Information fournie par le vendeur. Non vérifiée indépendamment par AutoParts."
                  : "Source non précisée."}
              </p>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-12 rounded-2xl border border-surface-200 bg-white px-6 py-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500">
            À propos de cette annonce
          </h3>
          <p className="mt-2 text-sm text-surface-600 leading-relaxed max-w-3xl">
            AutoParts est une plateforme de découverte. Le prix, la disponibilité et l’état
            sont indiqués par le vendeur. Les transactions se font directement entre vous et
            le magasin. La mention « Vérifié » signifie que les informations du vendeur ont
            passé le processus de vérification de la plateforme — elle ne garantit pas la
            qualité mécanique de la pièce.
          </p>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-surface-900">
                Produits similaires
              </h2>
              <Link
                href={`/search?category=${encodeURIComponent(product.category)}`}
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition"
              >
                Voir plus →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
