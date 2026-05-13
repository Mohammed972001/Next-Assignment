import { LoyaltyStrip } from "@/components/product/LoyaltyStrip";
import { PaymentInstallmentCards } from "@/components/product/PaymentInstallmentCards";
import { PRODUCT } from "@/lib/domain/product";

export function PdpOfferBlock() {
  return (
    <>
      <div className="mb-5">
        <PaymentInstallmentCards />
      </div>
      <LoyaltyStrip />
      <p className="mt-5 text-base leading-relaxed text-[#121212]/90">{PRODUCT.description}</p>
      <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
        {PRODUCT.tags.map((tag) => (
          <li key={tag}>
            <span className="inline-block border border-[#121212] px-2 py-1 text-xs font-semibold text-[#121212]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
