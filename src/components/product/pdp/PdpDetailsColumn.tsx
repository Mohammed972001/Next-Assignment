"use client";

import { PdpCustomizationSection } from "@/components/product/pdp/PdpCustomizationSection";
import { PdpOfferBlock } from "@/components/product/pdp/PdpOfferBlock";
import { PdpProductHeading } from "@/components/product/pdp/PdpProductHeading";
import type { PdpForm } from "@/hooks/usePdpForm";

type Props = {
  form: PdpForm;
  ratingAverage: number;
  reviewCount: number;
};

export function PdpDetailsColumn({ form, ratingAverage, reviewCount }: Props) {
  return (
    <div className="flex min-w-0 w-full flex-1 flex-col px-4 py-5 text-[#121212] sm:px-6 md:mx-auto md:max-w-[min(100%,45rem)] lg:max-w-none lg:border-l lg:border-[#121212] lg:px-10 lg:py-10">
      <PdpProductHeading ratingAverage={ratingAverage} reviewCount={reviewCount} />
      <PdpOfferBlock />
      <PdpCustomizationSection form={form} />
    </div>
  );
}
