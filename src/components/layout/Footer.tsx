import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
                A
              </div>
              <span className="text-lg font-bold text-surface-900">AutoParts</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-surface-600">
              La plateforme de découverte de pièces détachées au Maroc.
              Connectez-vous directement avec les magasins locaux.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-surface-900">Plateforme</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/search" className="text-sm text-surface-600 hover:text-surface-900">
                  Rechercher une pièce
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-sm text-surface-600 hover:text-surface-900">
                  Magasins
                </Link>
              </li>
              <li>
                <Link href="/seller/register" className="text-sm text-surface-600 hover:text-surface-900">
                  Devenir vendeur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900">Aide</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/help" className="text-sm text-surface-600 hover:text-surface-900">
                  Centre d’aide
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-surface-600 hover:text-surface-900">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-surface-600 hover:text-surface-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900">Légal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/legal/terms" className="text-sm text-surface-600 hover:text-surface-900">
                  Conditions d’utilisation
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm text-surface-600 hover:text-surface-900">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-200 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-surface-500">
            © {new Date().getFullYear()} AutoParts. Tous droits réservés.
          </p>
          <p className="text-xs text-surface-500">
            Plateforme de découverte • Transactions directes entre acheteurs et vendeurs
          </p>
        </div>
      </div>
    </footer>
  );
}
