"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { UpsellItem } from "@/lib/domain/product";

type UpsellCarouselProps = {
  items: readonly UpsellItem[];
  selectedIds: Set<string>;
  onToggle: (item: UpsellItem) => void;
};

export function UpsellCarousel({ items, selectedIds, onToggle }: UpsellCarouselProps) {
  const scroller = useRef<HTMLUListElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
    const step = isMobile ? el.clientWidth : 216;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const navBtn =
    "z-[2] flex h-10 w-9 shrink-0 items-center justify-center text-[#121212] sm:absolute sm:top-[5rem] sm:h-auto sm:w-auto sm:px-1";

  return (
    <section className="mb-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-base font-semibold text-[#121212] sm:text-lg sm:font-medium">
          Excellent combination with
        </h3>
        <Link
          href="/"
          className="hidden text-base font-normal text-[#121212] underline underline-offset-4 sm:inline"
        >
          View all collection
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:relative sm:items-stretch sm:gap-0 sm:px-8 md:px-10">
        <button
          type="button"
          className={`${navBtn} sm:left-0`}
          aria-label="Previous"
          onClick={() => scrollByDir(-1)}
        >
          <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.25} />
        </button>

        <ul
          ref={scroller}
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none sm:gap-4 sm:px-10 md:px-12"
        >
          {items.map((item) => {
            const checked = selectedIds.has(item.id);
            return (
              <li key={item.id} className="w-full shrink-0 snap-center sm:w-[100px] sm:snap-start">
                <div className="flex flex-col">
                  <button
                    type="button"
                    aria-pressed={checked}
                    onClick={() => onToggle(item)}
                    className="group flex w-full flex-col gap-3 text-left sm:items-center sm:gap-3.5 sm:text-center"
                  >
                    <span
                      className={[
                        "relative block w-full overflow-hidden border bg-white transition-shadow sm:h-[100px] sm:w-[100px]",
                        "h-48 max-sm:border-[#D1D5DB] max-sm:p-4",
                        "sm:border-[#121212] sm:p-0",
                        checked ? "max-sm:ring-2 max-sm:ring-[#121212] max-sm:ring-offset-2" : "",
                      ].join(" ")}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain p-1 sm:object-cover sm:p-0"
                        sizes="(max-width: 639px) 85vw, 100px"
                      />
                      <span
                        className={`absolute right-1.5 top-1.5 hidden h-5 w-5 items-center justify-center rounded-full border text-sm font-medium leading-none transition-colors duration-150 sm:flex ${
                          checked
                            ? "border-[#121212] bg-[#121212] text-white"
                            : "border-[#121212] bg-white text-[#121212]"
                        }`}
                        aria-hidden
                      >
                        {checked ? "✓" : "+"}
                      </span>
                    </span>
                    <span className="flex w-full flex-col gap-0.5 font-sans text-sm sm:text-xs">
                      <span className="font-medium text-[#121212] sm:block sm:truncate sm:font-normal sm:text-[#111]">
                        {item.name}
                      </span>
                      <span className="text-[#808080] sm:text-sm">{item.price} SAR</span>
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={`${navBtn} sm:right-0`}
          aria-label="Next"
          onClick={() => scrollByDir(1)}
        >
          <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.25} />
        </button>
      </div>
    </section>
  );
}
