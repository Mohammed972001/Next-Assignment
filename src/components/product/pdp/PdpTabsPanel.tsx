"use client";

import { Stars } from "@/components/ui/Stars";
import { PRODUCT } from "@/lib/domain/product";
import type { Review } from "@/lib/domain/types";

type Tab = "desc" | "reviews";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  ratingAverage: number;
  reviewCount: number;
  reviews: Review[];
  onWriteReview: () => void;
  onEditReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
};

export function PdpTabsPanel({
  activeTab,
  onTabChange,
  ratingAverage,
  reviewCount,
  reviews,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: Props) {
  const avg = ratingAverage || PRODUCT.rating;

  return (
    <section id="reviews-section" className="bg-white">
      <div className="hr-full-bleed-t" aria-hidden />
      <div
        className="mx-auto flex w-full max-w-[min(100vw,100rem)] flex-wrap justify-center gap-6 px-4 py-8 sm:gap-10 sm:px-8 sm:py-10 md:gap-14 lg:h-[150px] lg:items-center lg:px-12 lg:py-0 xl:px-16"
        role="tablist"
        aria-label="Product information"
      >
        <button
          type="button"
          role="tab"
          className={`bg-transparent font-sans text-lg font-medium sm:text-2xl md:text-3xl lg:text-[38px] lg:leading-none ${
            activeTab === "desc" ? "text-[#121212]" : "text-[#808080]"
          }`}
          aria-selected={activeTab === "desc"}
          onClick={() => onTabChange("desc")}
        >
          Product description
        </button>
        <button
          type="button"
          role="tab"
          className={`bg-transparent font-sans text-lg font-medium sm:text-2xl md:text-3xl lg:text-[38px] lg:leading-none ${
            activeTab === "reviews" ? "text-[#121212]" : "text-[#808080]"
          }`}
          aria-selected={activeTab === "reviews"}
          onClick={() => onTabChange("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="hr-full-bleed-b" aria-hidden />

      {activeTab === "desc" ? (
        <div key="desc" className="mx-auto max-w-[min(100vw,56rem)] px-4 py-10 text-center animate-fade-in sm:px-8 sm:py-14 lg:px-12 lg:py-20 xl:px-16">
          <p className="text-base leading-relaxed text-[#121212] sm:text-lg sm:leading-[1.8]">
            {PRODUCT.description} Crafted daily by our florists using the freshest stems. Vase not included
            unless selected. Care instructions are included with every order.
          </p>
        </div>
      ) : (
        <div key="reviews" className="px-4 py-10 animate-fade-in sm:px-8 lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-[min(100vw,100rem)]">
            <div className="flex flex-col gap-4 border-b border-[#121212] pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <span className="text-4xl font-medium sm:text-[42px]">{avg}</span>
                <div className="flex flex-col items-start gap-1">
                  <Stars value={avg} size={18} />
                  <span className="text-sm text-[#121212]">Based on {reviewCount} reviews</span>
                </div>
              </div>
              <button
                type="button"
                className="self-start bg-transparent text-sm font-medium text-[#121212] underline underline-offset-4 sm:self-auto"
                onClick={onWriteReview}
              >
                Add a rating
              </button>
            </div>
            <ul className="mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-12 p-0 sm:gap-x-14 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 2xl:gap-x-32">
              {reviews.map((r) => (
                <li key={r.id} className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-[#121212]">
                    {r.hideName ? "Private customer" : r.author}
                  </span>
                  <Stars value={r.rating} size={14} />
                  <p className="text-sm leading-relaxed text-[#121212] sm:text-base sm:leading-relaxed">
                    {r.body}
                  </p>
                  <time className="text-xs text-[#808080]" dateTime={r.createdAt}>
                    {r.createdAt}
                  </time>
                  {r.isEditable ? (
                    <div className="mt-2 flex gap-3 text-xs font-medium">
                      <button type="button" className="underline underline-offset-4" onClick={() => onEditReview(r.id)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-700 underline underline-offset-4"
                        onClick={() => onDeleteReview(r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
