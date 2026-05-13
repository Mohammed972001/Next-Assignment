import { STORAGE_REVIEWS } from "@/lib/domain/product";
import type { Review } from "@/lib/domain/types";

export function readStoredReviews(): Review[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_REVIEWS);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return null;
    return data as Review[];
  } catch {
    return null;
  }
}

export function writeStoredReviews(list: Review[]) {
  localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(list));
}
