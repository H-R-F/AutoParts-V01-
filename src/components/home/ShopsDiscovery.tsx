"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Shop, VerificationStatus } from "@/lib/types";

function verificationBadge(status: VerificationStatus) {
  switch (status) {
    case "verified":
      return { label: "Vérifié", cls: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" };
    case "pending":
    case "under_review":
    case "additional_info_required":
      return { label: "Vérification en cours", cls: "bg-amber-50 text-amber-700 ring-amber-600/20" };
    default:
      return { label: "Non vérifié", cls: "bg-surface-100 text-surface-600 ring-surface-300" };
  }
}

export function ShopsDiscovery({ shops }: { shops: Shop[] }) {
  const [city, setCity] = useState<string>("");

  // Only cities that actually have a shop are offered.
  const cities = useMemo(
    () => Array.from(new Set(shops.map((s) => s.city))).sort((a, b) => a.localeCompare(b, "fr")),
    [shops]
  );

  const visible = city ? shops.filter((s) => s.city === city) : shops;

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-surface-900 text-white"
        : "bg-white text-surface-700 ring-1 ring-surface-200 hover:bg-surface-100"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les magasins par ville">
        <button type="button" onClick={() => setCity("")} className={chip(city === "")} aria-pressed={city === ""}>
          Toutes les villes
        </button>
        {cities.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={chip(city === c)}
            aria-pressed={city === c}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((shop) => {
          const badge = verificationBadge(shop.verificationStatus);
          const whatsapp = shop.whatsapp
            ? `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`
            : null;

          return (
            <article key={shop.id} className="card flex flex-col p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg font-bold text-brand-700">
                  {shop.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-surface-900">{shop.name}</h3>
                  <p className="text-sm text-surface-600">
                    {shop.city}
                    {shop.district ? ` · ${shop.district}` : ""}
                  </p>
                </div>
              </div>

              <span
                className={`mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${badge.cls}`}
              >
                {badge.label}
              </span>

              <div className="mt-5 flex gap-2">
                {/* Shop profile pages are not built yet: this lists the shop's products. */}
                <Link
                  href={`/search?q=${encodeURIComponent(shop.name)}`}
                  className="btn-secondary flex-1 text-xs"
                >
                  Voir les pièces
                </Link>
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20bd5a]"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
