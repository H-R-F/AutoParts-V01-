/**
 * Core domain types for AutoParts.
 * These will evolve as the backend and full data model are implemented.
 */

export type ProductCondition = "new" | "used" | "refurbished";

export type ListingStatus =
  | "draft"
  | "pending_review"
  | "active"
  | "paused"
  | "out_of_stock"
  | "rejected";

export type VerificationStatus =
  | "not_submitted"
  | "pending"
  | "under_review"
  | "additional_info_required"
  | "verified"
  | "rejected"
  | "suspended";

export interface Shop {
  id: string;
  name: string;
  slug: string;
  city: string;
  district?: string;
  description?: string;
  verificationStatus: VerificationStatus;
  logoUrl?: string;
  coverUrl?: string;
  phone?: string;
  whatsapp?: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: string;
  condition: ProductCondition;
  oemReference?: string;
  manufacturerReference?: string;
  price: number;
  currency: "MAD";
  stock?: number;
  status: ListingStatus;
  shopId: string;
  images: string[];
  description?: string;
  isSponsored?: boolean;
  compatibilitySource?: "seller_provided" | "verified" | "unknown";
}
