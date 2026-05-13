"use client";

import { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import type { Review } from "@/lib/domain/types";
import { createId } from "@/lib/ids";
import { readStoredReviews, writeStoredReviews } from "@/lib/reviews/storage";

const DEMO_REVIEWS: Review[] = [
  {
    id: "seed-1",
    author: "Noura A.",
    rating: 5,
    body: "Absolutely stunning bouquet — fresh upon arrival and the packaging felt premium. Will order again for Eid.",
    hideName: false,
    createdAt: "2026-04-02",
    isEditable: false,
  },
  {
    id: "seed-2",
    author: "Faisal M.",
    rating: 4,
    body: "Beautiful roses and fast delivery. Would love more colour options next time.",
    hideName: false,
    createdAt: "2026-04-18",
    isEditable: false,
  },
  {
    id: "seed-3",
    author: "Verified buyer",
    rating: 5,
    body: "The fragrance is subtle and elegant. My partner loved it.",
    hideName: true,
    createdAt: "2026-05-01",
    isEditable: false,
  },
  {
    id: "seed-4",
    author: "Hala K.",
    rating: 4,
    body: "Great value during the sale. Vase add-on was worth it.",
    hideName: false,
    createdAt: "2026-05-06",
    isEditable: false,
  },
];

type NewReviewInput = {
  author: string;
  rating: number;
  body: string;
  hideName: boolean;
};

type ReviewSavePayload = {
  rating: number;
  body: string;
  hideName: boolean;
};

function normalizeRating(n: number) {
  return Math.min(5, Math.max(1, Math.round(n)));
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);

  useEffect(() => {
    const saved = readStoredReviews();
    startTransition(() => {
      if (saved && saved.length > 0) {
        setReviews(saved);
        return;
      }
      setReviews(DEMO_REVIEWS);
      writeStoredReviews(DEMO_REVIEWS);
    });
  }, []);

  const createReview = useCallback(
    (input: NewReviewInput) => {
      const row: Review = {
        id: createId(),
        author: input.hideName ? "Private customer" : input.author.trim() || "Customer",
        rating: normalizeRating(input.rating),
        body: input.body.trim(),
        hideName: input.hideName,
        createdAt: new Date().toISOString().slice(0, 10),
        isEditable: true,
      };
      setReviews((prev) => {
        const next = [row, ...prev];
        writeStoredReviews(next);
        return next;
      });
    },
    [],
  );

  const updateReview = useCallback((id: string, patch: ReviewSavePayload) => {
    setReviews((prev) => {
      const next = prev.map((r) => {
        if (r.id !== id || !r.isEditable) return r;
        const body = patch.body.trim();
        const hideName = patch.hideName;
        let author = r.author;
        if (hideName) {
          author = "Private customer";
        } else if (r.hideName && !hideName) {
          author = "Customer";
        }
        return {
          ...r,
          rating: normalizeRating(patch.rating),
          body,
          hideName,
          author,
        };
      });
      writeStoredReviews(next);
      return next;
    });
  }, []);

  const deleteReview = useCallback((id: string) => {
    setReviews((prev) => {
      const next = prev.filter((r) => !(r.id === id && r.isEditable));
      writeStoredReviews(next);
      return next;
    });
  }, []);

  const aggregate = useMemo(() => {
    if (!reviews.length) return { average: 0, count: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: Math.round((sum / reviews.length) * 10) / 10,
      count: reviews.length,
    };
  }, [reviews]);

  return {
    reviews,
    aggregate,
    createReview,
    updateReview,
    deleteReview,
  };
}
