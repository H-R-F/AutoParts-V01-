import Link from "next/link";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explorer",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/search", label: "Pièces détachées" },
      { href: "/#categories", label: "Catégories" },
      { href: "/#shops", label: "Magasins" },
      { href: "/#vehicle", label: "Recherche par véhicule" },
    ],
  },
  {
    title: "Vendeurs",
    links: [
      { href: "/seller/register", label: "Inscrire mon magasin" },
      { href: "/#faq-sellers", label: "Comment vendre" },
      { href: "/#faq-sellers", label: "Publicité et crédits" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/#part-request", label: "Demande de pièce" },
      { href: "/#how-it-works", label: "Comment ça marche" },
      { href: "/#faq", label: "Questions fréquentes" },
      { href: "/help", label: "Centre d’aide" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/legal/privacy", label: "Politique de confidentialité" },
      { href: "/legal/terms", label: "Conditions d’utilisation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
                A
              </div>
              <span className="text-lg font-bold text-surface-900">AutoParts</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-surface-600">
              La plateforme de découverte de pièces détachées au Maroc.
              Connectez-vous directement avec les magasins locaux.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-surface-900">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-600 hover:text-surface-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-surface-200 pt-8 sm:flex-row">
          <p className="text-xs text-surface-500">
            © {new Date().getFullYear()} AutoParts. Tous droits réservés.
          </p>
          <p className="text-xs text-surface-500">
            Plateforme de découverte • Transactions directes entre acheteurs et vendeurs • Prix en MAD
          </p>
        </div>
      </div>
    </footer>
  );
}
