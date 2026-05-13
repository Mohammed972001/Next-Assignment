"use client";

import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    author: string;
    rating: number;
    body: string;
    hideName: boolean;
  }) => void;
  initial?: {
    rating: number;
    body: string;
    hideName?: boolean;
  };
  title?: string;
  mode?: "create" | "edit";
};

export function ReviewModal({
  open,
  onClose,
  onSubmit,
  initial,
  title = "Leave your review",
  mode = "create",
}: ReviewModalProps) {
  const [rating, setRating] = useState(() => initial?.rating ?? 5);
  const [hoverStar, setHoverStar] = useState(0);
  const [body, setBody] = useState(() => initial?.body ?? "");
  const [hideName, setHideName] = useState(() =>
    mode === "edit" ? Boolean(initial?.hideName) : false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!body.trim()) return;
    onSubmit({ author: "", rating, body, hideName });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 animate-fade-in sm:items-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="w-full max-w-[min(100vw,550px)] border border-[#121212] bg-white shadow-xl animate-scale-in"
      >
        <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
          <button
            type="button"
            className="absolute right-3 top-3 p-1 text-[#121212] hover:opacity-70 sm:right-4 sm:top-4"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="flex items-center justify-between gap-4 pr-10">
            <h2
              id="review-modal-title"
              className="font-sans text-base font-normal leading-tight text-[#121212] sm:text-lg"
            >
              {title}
            </h2>
            <div
              className="mr-6 flex shrink-0 items-center gap-0.5 sm:mr-8"
              onMouseLeave={() => setHoverStar(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const active = n <= (hoverStar || rating);
                return (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-0.5 transition-transform duration-100 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverStar(n)}
                  >
                    <Star
                      className={`h-5 w-5 transition-colors duration-150 sm:h-5 sm:w-5 ${
                        active
                          ? "fill-[#F5A623] text-[#F5A623]"
                          : "fill-[#E0E0E0] text-[#E0E0E0]"
                      }`}
                      strokeWidth={0}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 h-0 border-t border-[#121212]" aria-hidden />

        <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-[#121212]">
            <input
              type="checkbox"
              checked={hideName}
              onChange={(e) => setHideName(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded-none border border-[#121212] accent-[#121212]"
            />
            <span>Hide my name in the customer list</span>
          </label>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="min-h-[160px] w-full resize-y rounded-none border border-[#121212] px-3 py-3 text-sm leading-relaxed outline-none placeholder:text-[#808080] focus:border-[#121212]"
            placeholder="Write your comment here"
          />

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              className="h-12 flex-1 rounded-none bg-[#121212] text-sm font-medium text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
              disabled={!body.trim()}
              onClick={handleSubmit}
            >
              {mode === "edit" ? "Save changes" : "Submit a review"}
            </button>
            <button
              type="button"
              className="h-12 flex-1 rounded-none border border-[#121212] bg-white text-sm font-normal lowercase text-[#121212] transition-all hover:bg-zinc-50 active:scale-[0.98]"
              onClick={onClose}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
