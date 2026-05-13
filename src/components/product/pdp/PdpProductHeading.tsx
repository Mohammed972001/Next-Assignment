import { Stars } from "@/components/ui/Stars";
import { PRODUCT } from "@/lib/domain/product";

type Props = {
  ratingAverage: number;
  reviewCount: number;
};

export function PdpProductHeading({ ratingAverage, reviewCount }: Props) {
  const displayRating = ratingAverage || PRODUCT.rating;
  const displayCount = reviewCount || PRODUCT.reviewCount;

  return (
    <>
      <p className="mb-3 text-sm font-medium uppercase leading-none text-[#121212]">
        {PRODUCT.category}
        <span className="mx-1 text-[#808080]">·</span>
        <span className="text-[#808080]">{PRODUCT.name}</span>
      </p>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm text-[#808080]">Product code: {PRODUCT.code}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Stars value={displayRating} size={16} />
          <span className="text-sm text-[#111]">{displayRating}</span>
          <a
            href="#reviews-section"
            className="text-sm text-[#111] underline-offset-4 hover:underline"
          >
            Based on {displayCount} reviews
          </a>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-medium leading-tight sm:text-3xl lg:text-[38px] lg:leading-none">
          {PRODUCT.name}
          <span className="mx-1 font-normal">—</span>
          <span>{PRODUCT.price} SR</span>
        </h1>
        <span className="text-lg text-[#808080] line-through sm:text-[25px]">{PRODUCT.compareAt} SR</span>
        <span className="bg-[#111] px-2.5 py-1.5 text-[13px] font-normal tracking-wide text-white">
          {PRODUCT.discountLabel}
        </span>
      </div>
    </>
  );
}
