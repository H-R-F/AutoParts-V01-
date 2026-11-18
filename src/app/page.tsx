import Link from "next/link";
import Image from "next/image";
import { HomeSearch } from "@/components/search/HomeSearch";

const CATEGORIES = [
  {
    name: "Freinage",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",
  },
  {
    name: "Moteur",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
  },
  {
    name: "Suspension",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
  },
  {
    name: "Filtration",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
  },
  {
    name: "Électrique",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=400&fit=crop",
  },
  {
    name: "Transmission",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
  },
];

const FEATURES = [
  {
    title: "Comparaison des offres",
    desc: "Consultez plusieurs magasins en un seul endroit",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Contact direct",
    desc: "WhatsApp et téléphone avec le vendeur",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Vendeurs vérifiés",
    desc: "Indicateur de vérification transparent",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="bg-surface-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-900">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop"
            alt="Voiture premium"
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900 via-surface-900/90 to-surface-900/40" />
        </div>

        <div className="container-main relative py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Trouvez vos pièces
              <span className="block text-brand-300">facilement au Maroc</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-surface-300 max-w-xl">
              Recherchez par nom, véhicule, référence OEM ou photo. Comparez les offres
              et contactez directement les vendeurs.
            </p>

            {/* Feature pills */}
            <div className="mt-5 flex flex-wrap gap-3">
              {["Comparaison des magasins", "Contact direct", "Sans commission"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm ring-1 ring-white/20"
                  >
                    <svg className="h-4 w-4 text-brand-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </span>
                )
              )}
            </div>

            {/* Multi-mode Search */}
            <div className="mt-8">
              <HomeSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-main py-14 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">
              Catégories populaires
            </h2>
            <p className="mt-1.5 text-surface-600">
              Explorez par type de pièce
            </p>
          </div>
          <Link
            href="/search"
            className="hidden sm:inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700 transition"
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/search?category=${encodeURIComponent(cat.name)}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-surface-200 transition-all duration-300 hover:shadow-soft hover:ring-brand-200"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span className="text-sm font-semibold text-white drop-shadow">
                    {cat.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust / Features */}
      <section className="border-y border-surface-200 bg-white">
        <div className="container-main py-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900">{feature.title}</h3>
                  <p className="mt-1 text-sm text-surface-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-main py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
            Comment ça marche
          </h2>
          <p className="mt-3 text-surface-600">
            AutoParts facilite la découverte. Vous négociez ensuite directement avec le vendeur.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Recherchez",
              desc: "Par nom de pièce, véhicule, référence OEM ou photo.",
            },
            {
              step: "2",
              title: "Comparez",
              desc: "Consultez les offres, prix et disponibilité de plusieurs magasins.",
            },
            {
              step: "3",
              title: "Contactez",
              desc: "Appelez ou écrivez directement au vendeur via WhatsApp ou téléphone.",
            },
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white shadow-lg shadow-brand-600/25">
                {item.step}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-surface-900">
                {item.title}
              </h3>
              <p className="mt-2 text-surface-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seller CTA */}
      <section className="container-main pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-14 sm:px-12 sm:py-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-700/40 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Vous êtes un magasin de pièces ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100 leading-relaxed">
              Inscrivez votre boutique gratuitement. Publiez vos produits, gagnez en
              visibilité et recevez des demandes de clients près de chez vous.
            </p>
            <div className="mt-8">
              <Link
                href="/seller/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-900 shadow-lg transition hover:bg-brand-50"
              >
                Créer mon compte vendeur
              </Link>
            </div>
            <p className="mt-5 text-sm text-brand-200">
              Inscription gratuite · Annonces gratuites · Pas de commission sur les ventes ordinaires
            </p>
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="container-main pb-16">
        <div className="rounded-2xl border border-surface-200 bg-white px-6 py-8 text-center">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500">
            Transparence
          </h3>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-surface-600 leading-relaxed">
            AutoParts est une plateforme de découverte. Les transactions ordinaires se
            font directement entre vous et le vendeur. Les produits sponsorisés sont
            clairement identifiés. La vérification d’un vendeur signifie que les
            informations soumises ont passé le processus de la plateforme — elle ne
            garantit pas la qualité de chaque pièce.
          </p>
        </div>
      </section>
    </div>
  );
}
