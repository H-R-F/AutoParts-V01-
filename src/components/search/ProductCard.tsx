import Link from "next/link";
import Image from "next/image";
import type { DemoProduct } from "@/lib/demo-data";
import { CONDITION_LABELS } from "@/lib/demo-data";

interface ProductCardProps {
  product: DemoProduct;
  /** Show the publication date (used by the "recently added" section). */
  showListingDate?: boolean;
}

export function ProductCard({ product, showListingDate = false }: ProductCardProps) {
  const listingDate =
    showListingDate && product.createdAt
      ? new Date(product.createdAt).toLocaleDateString("fr-MA", {
          day: "numeric",
          month: "short",
        })
      : null;

  const whatsappLink = product.shopWhatsapp
    ? `https://wa.me/${product.shopWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Bonjour, je suis intéressé par : ${product.name}${product.oemReference ? ` (réf. ${product.oemReference})` : ""}`
      )}`
    : null;

  const phoneLink = product.shopPhone ? `tel:${product.shopPhone}` : null;
  const imageUrl = product.images?.[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-surface-200 transition-all duration-300 hover:shadow-soft hover:ring-surface-300">
      {/* Sponsored badge */}
      {product.isSponsored && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-md bg-accent-500/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Sponsorisé
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/parts/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-surface-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={product.isSponsored}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-surface-300">
            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}

        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {/* Condition + Brand */}
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              product.condition === "new"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                : product.condition === "refurbished"
                ? "bg-sky-50 text-sky-700 ring-1 ring-sky-600/20"
                : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
            }`}
          >
            {CONDITION_LABELS[product.condition]}
          </span>
          {product.brand && (
            <span className="font-medium text-surface-500">{product.brand}</span>
          )}
        </div>

        {/* Name */}
        <Link href={`/parts/${product.id}`} className="mt-2.5 block">
          <h3 className="text-[15px] font-semibold leading-snug text-surface-900 line-clamp-2 transition group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>

        {/* References */}
        {(product.oemReference || product.manufacturerReference) && (
          <p className="mt-1.5 text-[11px] text-surface-500 font-mono tracking-tight">
            {product.oemReference && <span>OEM {product.oemReference}</span>}
            {product.oemReference && product.manufacturerReference && (
              <span className="mx-1.5 text-surface-300">|</span>
            )}
            {product.manufacturerReference && (
              <span>Réf {product.manufacturerReference}</span>
            )}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-xl font-bold tracking-tight text-surface-900">
            {product.price.toLocaleString("fr-MA")}
          </span>
          <span className="text-sm font-medium text-surface-500">DH</span>
          {listingDate && (
            <span className="ml-auto text-xs text-surface-500">
              Ajouté le {listingDate}
            </span>
          )}
        </div>

        {/* Shop info */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-surface-600">
          <Link
            href={`/shops/${product.shopSlug}`}
            className="font-medium text-surface-800 hover:text-brand-700 transition"
          >
            {product.shopName}
          </Link>
          <span className="text-surface-300">·</span>
          <span>{product.shopCity}</span>
          {product.shopVerification === "verified" && (
            <>
              <span className="text-surface-300">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Vérifié
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20bd5a] active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          )}
          {phoneLink && (
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center rounded-xl bg-surface-100 px-3.5 py-2.5 text-surface-700 transition hover:bg-surface-200 active:scale-[0.98]"
              aria-label="Appeler le vendeur"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
