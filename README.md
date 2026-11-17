# AutoParts

**Moroccan spare-parts marketplace & discovery platform**

AutoParts connects buyers with local spare-parts shops, suppliers and distributors.  
It is a **discovery and marketplace platform** — not a conventional online store that owns inventory or processes ordinary transactions.

---

## Core Business Rules (Never Violate)

- Seller registration is **free**
- Ordinary product listings are **free**
- **No commission** on ordinary sales
- Customers and sellers arrange price, payment and delivery **directly**
- AutoParts does **not** process ordinary purchase payments
- Primary revenue = **Advertising Credits** (sponsored placements, always clearly labelled)
- Sponsored content must never override factual compatibility or availability
- No fake verification badges, reviews, stock levels or business information
- Seller-provided compatibility is clearly distinguished from verified data
- Visual inspection ≠ guarantee of internal condition or safety

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design system
- **Target market**: Morocco (MAD, cities, Arabic + French ready)

---

## Project Structure

```
src/
├── app/                  # App Router pages
│   ├── layout.tsx
│   ├── page.tsx           # Homepage
│   ├── search/
│   ├── parts/[id]/
│   ├── shops/[id]/
│   ├── seller/            # Seller dashboard & workflows
│   └── admin/             # Administration platform
├── components/
│   ├── layout/            # Header, Footer
│   ├── ui/                # Shared UI primitives
│   └── ...
└── lib/                   # Utilities, types, constants
```

---

## Development Phases

1. **Public marketplace foundation** (Homepage, Search, Product, Shop)
2. **Seller onboarding** (Registration, Dashboard, Product management)
3. **Trust & moderation** (Seller verification, Product review) ← *current priority*
4. **Customer experience** (Account, Favorites, Part requests)
5. **Advertising business** (Credits, Campaigns)
6. **Platform operations** (Admin, Roles, Audit logs)
7. **Optional services** (Inspection, Delivery)
8. **Production readiness** (Backend, Auth, Security, Monitoring)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Important Notes

- This is currently a **frontend foundation**. Backend, real authentication, persistent database and production security are not yet implemented.
- All demo data must be clearly labelled.
- Never display a “Verified” badge unless the verification process has actually approved the seller.

---

Built for the Moroccan market with a clear path to expansion.
