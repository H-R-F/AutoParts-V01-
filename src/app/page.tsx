import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-surface-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-surface-900 to-surface-900" />
        <div className="container-main relative py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Trouvez la bonne pièce,
              <span className="block text-brand-300">plus rapidement</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-surface-300">
              AutoParts réunit les magasins de pièces détachées au Maroc.
              Recherchez par référence, nom ou véhicule, comparez les offres et
              contactez directement les vendeurs.
            </p>

            {/* Search Box */}
            <div className="mt-10 max-w-2xl">
              <form action="/search" method="get" className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="search"
                    name="q"
                    placeholder="Référence OEM, nom de pièce, marque..."
                    className="w-full rounded-xl border-0 py-3.5 pl-4 pr-4 text-surface-900 shadow-lg ring-1 ring-inset ring-surface-300 placeholder:text-surface-400 focus:ring-2 focus:ring-brand-500 sm:text-base"
                    aria-label="Rechercher une pièce"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-accent rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg"
                >
                  Rechercher
                </button>
              </form>
              <p className="mt-3 text-sm text-surface-400">
                Exemples : filtre à huile, 1KD-FTV, plaquettes frein, alternateur...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-main py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">
              Catégories populaires
            </h2>
            <p className="mt-2 text-surface-600">
              Explorez les grandes familles de pièces
            </p>
          </div>
          <Link
            href="/search"
            className="hidden text-sm font-semibold text-brand-600 hover:text-brand-700 sm:block"
          >
            Voir toutes →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "Freinage", icon: "🚗" },
            { name: "Moteur", icon: "⚙️" },
            { name: "Suspension", icon: "💦" },
            { name: "Éclairage", icon: "💡" },
            { name: "Filtration", icon: "🔍" },
            { name: "Électrique", icon: "⚡" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/search?category=${encodeURIComponent(cat.name)}`}
              className="card group flex flex-col items-center gap-3 p-6 text-center transition hover:shadow-soft hover:ring-brand-200"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-surface-800 group-hover:text-brand-700">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-surface-200">
        <div className="container-main py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-surface-900">
              Comment ça marche
            </h2>
            <p className="mt-3 text-surface-600">
              Un processus simple et transparent. AutoParts facilite la découverte,
              vous négociez ensuite directement avec le vendeur.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Recherchez",
                desc: "Par référence OEM, nom de pièce, marque ou véhicule.",
              },
              {
                step: "02",
                title: "Comparez",
                desc: "Consultez les offres des magasins, prix et disponibilité.",
              },
              {
                step: "03",
                title: "Contactez",
                desc: "Appelez ou écrivez directement au vendeur via WhatsApp ou téléphone.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-4xl font-bold text-brand-100">{item.step}</div>
                <h3 className="mt-2 text-lg font-semibold text-surface-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-surface-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="container-main py-16">
        <div className="rounded-3xl bg-brand-900 px-8 py-12 sm:px-12 sm:py-16 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Vous êtes un magasin de pièces ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
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
          <p className="mt-4 text-sm text-brand-200">
            Inscription gratuite • Annonces gratuites • Pas de commission sur les ventes ordinaires
          </p>
        </div>
      </section>

      {/* Trust note */}
      <section className="container-main pb-16">
        <div className="rounded-2xl bg-surface-100 px-6 py-8 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-surface-500">
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
