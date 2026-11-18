import Link from "next/link";
import Image from "next/image";
import { HomeSearch } from "@/components/search/HomeSearch";
import { ProductCard } from "@/components/search/ProductCard";
import { VehicleFinder } from "@/components/home/VehicleFinder";
import { ShopsDiscovery } from "@/components/home/ShopsDiscovery";
import { PartRequestForm } from "@/components/home/PartRequestForm";
import { DEMO_PRODUCTS, DEMO_SHOPS } from "@/lib/demo-data";
import {
  HOME_CATEGORIES,
  POPULAR_SEARCHES,
  HERO_EXAMPLES,
  HOW_IT_WORKS_STEPS,
  WHY_BENEFITS,
  FAQ_CUSTOMERS,
  FAQ_SELLERS,
  type FaqItem,
} from "@/lib/home-data";

/* ---------- Small presentational helpers ---------- */

function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-surface-600">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="hidden shrink-0 text-sm font-semibold text-brand-600 transition hover:text-brand-700 sm:inline-flex"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

function DemoNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-xs text-surface-500">{children}</p>;
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-surface-200 bg-white px-4 py-3 open:shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-surface-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              className="h-5 w-5 shrink-0 text-surface-400 transition group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-6 text-surface-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  // Only publicly visible, active listings (drafts / rejected never shown).
  const activeProducts = DEMO_PRODUCTS.filter((p) => p.status === "active");
  const sponsored = activeProducts.filter((p) => p.isSponsored).slice(0, 3);
  // "Recently added" is ordered by publication time and kept separate from
  // paid placements, so sponsored items are excluded here.
  const recent = activeProducts
    .filter((p) => !p.isSponsored)
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    )
    .slice(0, 4);

  return (
    <div className="bg-surface-50">
      {/* 1. HERO + SEARCH */}
      <section className="relative overflow-hidden bg-surface-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900 via-surface-900/90 to-surface-900/50" />
        </div>

        <div className="container-main relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Trouvez la bonne pièce.
              <span className="block text-accent-400">Découvrez le bon vendeur.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-surface-300">
              Découvrez des pièces détachées chez des magasins et fournisseurs,
              comparez les offres disponibles et contactez directement les
              vendeurs — au même endroit.
            </p>

            <div className="mt-8">
              <HomeSearch />
            </div>

            {/* Quick examples */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-surface-400">Essayez :</span>
              {HERO_EXAMPLES.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-white/90 ring-1 ring-white/15 transition hover:bg-white/20"
                >
                  {term}
                </Link>
              ))}
            </div>

            {/* Factual trust points (no invented statistics) */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-surface-300">
              {[
                "Plusieurs vendeurs en un seul endroit",
                "Contact direct avec les magasins",
                "Annonces ordinaires gratuites",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. SEARCH BY VEHICLE */}
      <section id="vehicle" className="scroll-mt-20 bg-white">
        <div className="container-main py-14 sm:py-16">
          <SectionHeading
            title="Trouvez les pièces de votre véhicule"
            subtitle="Sélectionnez votre véhicule pour affiner la recherche et découvrir les pièces pertinentes."
          />
          <VehicleFinder />
          <DemoNote>
            Catalogue de véhicules de démonstration : il ne couvre pas encore
            l’ensemble du parc automobile marocain.
          </DemoNote>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section id="categories" className="container-main scroll-mt-20 py-14 sm:py-16">
        <SectionHeading
          title="Parcourez les catégories"
          subtitle="Explorez la plateforme par type de pièce."
          action={{ href: "/search", label: "Voir toutes les pièces" }}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {HOME_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/search?category=${encodeURIComponent(cat.name)}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-surface-200 transition-all duration-300 hover:shadow-soft hover:ring-brand-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200 text-surface-400">
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-surface-900">{cat.name}</h3>
                <p className="mt-1 text-sm text-surface-600">{cat.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  Voir les pièces →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR SEARCHES */}
      <section className="border-y border-surface-200 bg-white">
        <div className="container-main py-10 sm:py-12">
          <h2 className="text-xl font-bold tracking-tight text-surface-900">
            Recherches populaires
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {POPULAR_SEARCHES.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full bg-surface-100 px-4 py-2 text-sm font-medium text-surface-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {term}
              </Link>
            ))}
          </div>
          <DemoNote>
            Exemples de démonstration. Les recherches populaires seront calculées
            à partir de l’activité réelle de la plateforme.
          </DemoNote>
        </div>
      </section>

      {/* 5. SPONSORED PRODUCTS */}
      {sponsored.length > 0 && (
        <section className="container-main py-14 sm:py-16">
          <SectionHeading
            title="Pièces mises en avant"
            subtitle="Découvrez les produits promus par des vendeurs participants."
            action={{ href: "/search", label: "Explorer toutes les pièces" }}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sponsored.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <DemoNote>
            Annonces sponsorisées clairement identifiées. La promotion ne garantit
            ni la disponibilité, ni la compatibilité, ni une vente. Produits et
            prix de démonstration.
          </DemoNote>
        </section>
      )}

      {/* 6. SHOPS */}
      <section id="shops" className="scroll-mt-20 border-y border-surface-200 bg-white">
        <div className="container-main py-14 sm:py-16">
          <SectionHeading
            title="Découvrez les magasins de pièces"
            subtitle="Explorez les magasins et fournisseurs, et trouvez des vendeurs dans votre ville."
          />
          <ShopsDiscovery shops={DEMO_SHOPS} />
          <DemoNote>
            Magasins fictifs de démonstration. Un badge « Vérifié » n’est affiché
            que si la vérification a réellement été approuvée.
          </DemoNote>
        </div>
      </section>

      {/* 7. RECENTLY ADDED */}
      {recent.length > 0 && (
        <section className="container-main py-14 sm:py-16">
          <SectionHeading
            title="Ajoutées récemment"
            subtitle="Les dernières annonces publiées, classées par date de publication."
            action={{ href: "/search", label: "Voir toutes les pièces" }}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((product) => (
              <ProductCard key={product.id} product={product} showListingDate />
            ))}
          </div>
        </section>
      )}

      {/* 8. HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-20 border-y border-surface-200 bg-white">
        <div className="container-main py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
              Trouver votre pièce est simple
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/25">
                  {item.step}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-surface-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-surface-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl rounded-xl bg-surface-50 px-5 py-4 text-center text-sm leading-relaxed text-surface-600 ring-1 ring-surface-200">
            AutoParts met en relation acheteurs et vendeurs. Les achats ordinaires
            se conviennent directement entre le client et le vendeur : AutoParts ne
            traite pas ces paiements.
          </p>
        </div>
      </section>

      {/* 9. WHY AUTOPARTS */}
      <section className="container-main py-14 sm:py-16">
        <SectionHeading title="Pourquoi utiliser AutoParts ?" />
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_BENEFITS.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <CheckIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900">{b.title}</h3>
                <p className="mt-1 text-sm leading-6 text-surface-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PART REQUEST */}
      <section id="part-request" className="scroll-mt-20 border-y border-surface-200 bg-white">
        <div className="container-main py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
                Vous ne trouvez pas la pièce ?
              </h2>
              <p className="mt-3 leading-relaxed text-surface-600">
                Dites-nous ce dont vous avez besoin et envoyez une demande de pièce.
                Précisez le véhicule, la référence si vous la connaissez, et
                ajoutez une photo si possible.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-surface-600">
                {[
                  "Votre demande est validée avant d’être enregistrée.",
                  "Seuls les vendeurs ou membres autorisés pourront la consulter.",
                  "Vos coordonnées ne sont jamais affichées publiquement.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <PartRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* 11. SELLER CTA */}
      <section className="container-main py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-surface-900 px-6 py-12 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/25 via-transparent to-transparent" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Vous tenez un magasin de pièces ? Gagnez en visibilité avec AutoParts.
              </h2>
              <p className="mt-4 leading-relaxed text-surface-300">
                Présentez votre magasin en ligne, publiez vos produits
                gratuitement et aidez plus de clients à vous découvrir.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/seller/register" className="btn-accent px-7 py-3.5 text-base">
                  Inscrire mon magasin — gratuit
                </Link>
                <Link
                  href="#faq-sellers"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/30 transition hover:bg-white/10"
                >
                  Comment vendre
                </Link>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Inscription du magasin gratuite",
                "Annonces ordinaires gratuites",
                "Touchez les clients qui cherchent des pièces",
                "Gérez vos produits depuis un tableau de bord",
                "Promotion optionnelle avec des crédits publicitaires",
                "Recevez les demandes directement",
                "Aucune commission sur les ventes ordinaires",
                "Les clients vous contactent directement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-surface-200">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-surface-200 bg-white">
        <div className="container-main py-14 sm:py-16">
          <SectionHeading title="Questions fréquentes" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-500">
                Acheteurs
              </h3>
              <FaqList items={FAQ_CUSTOMERS} />
            </div>
            <div id="faq-sellers" className="scroll-mt-24">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-500">
                Vendeurs
              </h3>
              <FaqList items={FAQ_SELLERS} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
