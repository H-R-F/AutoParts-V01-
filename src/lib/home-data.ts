/**
 * HOMEPAGE CONTENT — placeholder configuration.
 *
 * In production these lists come from the admin system / CMS / analytics
 * (categories DB, search analytics, FAQ CMS). Until then they are static
 * and must not be presented as real statistics.
 */

export interface HomeCategory {
  name: string; // must match Product.category values
  description: string;
  image?: string;
}

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    name: "Moteur",
    description: "Composants moteur, supports",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop",
  },
  {
    name: "Freinage",
    description: "Plaquettes, disques, étriers",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=600&fit=crop",
  },
  {
    name: "Suspension",
    description: "Amortisseurs, bras, rotules",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=600&fit=crop",
  },
  {
    name: "Transmission",
    description: "Embrayage, pièces de boîte",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=600&fit=crop",
  },
  {
    name: "Électrique",
    description: "Alternateurs, démarreurs, batteries",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=600&fit=crop",
  },
  {
    name: "Filtration",
    description: "Filtres à huile, à air, carburant",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
  },
  {
    name: "Carrosserie",
    description: "Pare-chocs, portières, rétroviseurs",
  },
  {
    name: "Éclairage",
    description: "Phares, feux arrière",
  },
];

/** Example terms only — NOT real search statistics. */
export const POPULAR_SEARCHES = [
  "Plaquettes de frein",
  "Filtre à huile",
  "Alternateur",
  "Kit d’embrayage",
  "Amortisseur",
  "Radiateur",
  "Phare avant",
  "Support moteur",
];

/** Quick examples shown under the hero search. */
export const HERO_EXAMPLES = [
  "Plaquettes de frein",
  "Alternateur",
  "Kit d’embrayage",
  "Filtre à huile",
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Recherchez votre pièce",
    desc: "Par nom de pièce, référence OEM, véhicule ou photo.",
  },
  {
    step: "02",
    title: "Explorez les offres",
    desc: "Découvrez les produits, comparez les informations disponibles et explorez les magasins.",
  },
  {
    step: "03",
    title: "Contactez le vendeur",
    desc: "Discutez directement du prix, du paiement et de la livraison avec le vendeur.",
  },
];

export const WHY_BENEFITS = [
  {
    title: "Une découverte plus simple",
    desc: "Trouvez des produits de plusieurs vendeurs participants en un seul endroit.",
  },
  {
    title: "Plusieurs façons de chercher",
    desc: "Nom de pièce, référence OEM, véhicule ou photo.",
  },
  {
    title: "Des informations comparables",
    desc: "Consultez prix, état, références et localisation des vendeurs.",
  },
  {
    title: "Contact direct",
    desc: "Parlez au vendeur sans intermédiaire pour l’achat ordinaire.",
  },
  {
    title: "Visibilité pour les magasins",
    desc: "Aidez les commerces locaux de pièces détachées à présenter leur stock en ligne.",
  },
  {
    title: "Promotion transparente",
    desc: "Les emplacements payants et produits sponsorisés sont toujours clairement identifiés.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_CUSTOMERS: FaqItem[] = [
  {
    q: "Qu’est-ce qu’AutoParts ?",
    a: "AutoParts est une plateforme de découverte de pièces détachées au Maroc. Elle met en relation les acheteurs et les magasins, sans posséder de stock elle-même.",
  },
  {
    q: "Comment trouver une pièce ?",
    a: "Utilisez la recherche par nom de pièce, par véhicule, par référence OEM ou par photo, puis filtrez par ville, catégorie, marque ou état.",
  },
  {
    q: "Puis-je chercher par véhicule ?",
    a: "Oui. Sélectionnez la marque, le modèle, l’année et le moteur. La sélection aide à affiner les résultats mais ne confirme pas la compatibilité d’une annonce.",
  },
  {
    q: "Comment identifier la bonne référence OEM ?",
    a: "La référence est souvent gravée sur la pièce d’origine ou indiquée sur son emballage. En cas de doute, demandez au vendeur de confirmer la référence avant d’acheter.",
  },
  {
    q: "Comment contacter un vendeur ?",
    a: "Chaque annonce propose les moyens de contact fournis par le magasin (WhatsApp, téléphone) lorsqu’ils sont disponibles.",
  },
  {
    q: "Dois-je payer les produits via AutoParts ?",
    a: "Non. Pour les achats ordinaires, le prix, le paiement et la livraison sont convenus directement entre vous et le vendeur. AutoParts ne traite pas ces paiements.",
  },
  {
    q: "AutoParts garantit-il la compatibilité ?",
    a: "Non. La compatibilité indiquée par un vendeur est clairement distinguée des données vérifiées. Confirmez toujours avec le vendeur avant d’acheter.",
  },
  {
    q: "Puis-je demander une pièce introuvable ?",
    a: "Oui, via la demande de pièce. Dans cette version de démonstration, la demande reste locale et n’est transmise à aucun vendeur.",
  },
  {
    q: "L’inspection est-elle disponible ?",
    a: "Une inspection visuelle optionnelle pourra être proposée pour certains produits et lieux. Elle se limite à son périmètre annoncé et ne garantit ni l’état interne, ni la sécurité, ni la durabilité.",
  },
  {
    q: "La livraison est-elle disponible ?",
    a: "Des options de livraison pourront être proposées là où elles sont prises en charge. Les frais de livraison sont distincts du prix du produit et la disponibilité n’est pas garantie dans toutes les villes.",
  },
];

export const FAQ_SELLERS: FaqItem[] = [
  {
    q: "Comment inscrire mon magasin ?",
    a: "Créez un compte vendeur, renseignez les informations de votre magasin et soumettez-les pour vérification.",
  },
  {
    q: "L’inscription est-elle gratuite ?",
    a: "Oui, l’inscription des vendeurs est gratuite.",
  },
  {
    q: "Puis-je publier des produits gratuitement ?",
    a: "Oui, la publication des annonces ordinaires est gratuite.",
  },
  {
    q: "AutoParts prélève-t-il une commission ?",
    a: "Non. Il n’y a pas de commission sur les ventes ordinaires : vous traitez directement avec le client.",
  },
  {
    q: "Comment fonctionne la vérification des vendeurs ?",
    a: "Les informations soumises passent par le processus de la plateforme. Le badge « Vérifié » n’apparaît qu’après approbation et ne garantit pas la qualité de chaque pièce.",
  },
  {
    q: "Que sont les crédits publicitaires ?",
    a: "Ce sont des crédits optionnels pour promouvoir vos produits ou votre magasin. Les placements payants sont toujours signalés comme « Sponsorisé ».",
  },
  {
    q: "Comment promouvoir mon magasin ?",
    a: "Avec des crédits publicitaires, selon les règles de la plateforme. La promotion ne garantit pas de vente et ne remplace jamais la compatibilité ni la disponibilité réelles.",
  },
  {
    q: "Comment gérer mon inventaire ?",
    a: "Depuis votre tableau de bord vendeur, en cours de développement dans cette version.",
  },
];
