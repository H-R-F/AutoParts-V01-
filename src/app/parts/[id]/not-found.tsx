import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-surface-50 min-h-[60vh] flex items-center justify-center">
      <div className="container-main py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-100">
          <svg className="h-8 w-8 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-surface-900">Produit introuvable</h1>
        <p className="mt-3 text-surface-600 max-w-md mx-auto">
          Cette annonce n’existe pas ou a été retirée.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/search" className="btn-primary">
            Rechercher une pièce
          </Link>
          <Link href="/" className="btn-secondary">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
