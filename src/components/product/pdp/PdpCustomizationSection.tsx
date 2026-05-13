"use client";

import Link from "next/link";
import { CalendarClock, Clock3 } from "lucide-react";
import { UpsellCarousel } from "@/components/product/UpsellCarousel";
import { pdpField, pdpTextarea } from "@/components/ui/pdpFormFieldClasses";
import type { PdpForm } from "@/hooks/usePdpForm";
import { ADDITIONAL_OPTIONS, FLORAL_OPTIONS, PRODUCT } from "@/lib/domain/product";
import type { UpsellItem } from "@/lib/domain/product";

type Props = {
  form: PdpForm;
};

export function PdpCustomizationSection({ form }: Props) {
  const {
    qty,
    setQty,
    colorId,
    setColorId,
    size,
    setSize,
    selectedUpsellIds,
    toggleUpsell,
    optionsOpen,
    setOptionsOpen,
    floralOption,
    setFloralOption,
    additionalOption,
    setAdditionalOption,
    writtenMessage,
    setWrittenMessage,
    writtenNote,
    setWrittenNote,
    timeLimit,
    setTimeLimit,
    dateLimit,
    setDateLimit,
    numberPlate,
    setNumberPlate,
    purchaseType,
    setPurchaseType,
    addedHint,
    addToBasket,
  } = form;

  const onUpsellToggle = (item: UpsellItem) => toggleUpsell(item.id);

  return (
    <>
      <section className="mt-6" aria-labelledby="upsell-heading">
        <h2 id="upsell-heading" className="sr-only">
          Complementary products
        </h2>
        <UpsellCarousel items={PRODUCT.upsells} selectedIds={selectedUpsellIds} onToggle={onUpsellToggle} />
      </section>

      <fieldset className="mb-6 mt-6 flex flex-row flex-wrap gap-x-10 gap-y-4 border-0 p-0">
        <legend className="sr-only">Variations</legend>
        <div>
          <span className="mb-3 block text-lg font-medium capitalize text-[#0A0C10]">Color</span>
          <div className="flex flex-wrap gap-2">
            {PRODUCT.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.label}
                aria-pressed={colorId === c.id}
                className={`h-9 w-9 border transition-shadow duration-150 ${
                  colorId === c.id
                    ? "border border-[#121212] shadow-[inset_0_0_0_1px_#fff]"
                    : "border-[#121212]"
                }`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColorId(c.id)}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="mb-3 block text-lg font-medium capitalize text-[#0A0C10]">Size</span>
          <div className="flex flex-wrap gap-2">
            {PRODUCT.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={`flex h-9 min-w-9 items-center justify-center border px-2.5 text-xs font-medium transition-colors duration-150 ${
                  size === s
                    ? "border-[#121212] bg-[#121212] text-white"
                    : "border-[#121212] bg-transparent text-[#111]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="mb-6">
        <button
          type="button"
          className="flex w-full items-center justify-between border-0 border-b border-[#121212] py-[18px] text-left text-base font-medium text-[#121212]"
          aria-expanded={optionsOpen}
          onClick={() => setOptionsOpen((o) => !o)}
        >
          Additional options
          <span
            className={`transition-transform duration-200 ${optionsOpen ? "" : "-rotate-90"}`}
            aria-hidden
          >
            ⌄
          </span>
        </button>
        {optionsOpen ? (
          <div className="grid grid-cols-1 gap-6 pt-6 animate-slide-up md:grid-cols-2 md:gap-x-6 lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-6">
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#121212]">Add floral options</span>
              <div className="relative">
                <select
                  className={`${pdpField} cursor-pointer pr-10`}
                  value={floralOption}
                  onChange={(e) => setFloralOption(e.target.value)}
                >
                  {FLORAL_OPTIONS.map((o) => (
                    <option key={o.value || "none"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" aria-hidden>
                  ⌄
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#121212]">More options</span>
              <div className="relative">
                <select
                  className={`${pdpField} cursor-pointer pr-10`}
                  value={additionalOption}
                  onChange={(e) => setAdditionalOption(e.target.value)}
                >
                  {ADDITIONAL_OPTIONS.map((o) => (
                    <option key={o.value || "none"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" aria-hidden>
                  ⌄
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <span className="text-base font-medium text-[#121212]">
                Written field <span className="font-normal">(+ 50.00 SAR)</span>
                <span className="text-red-600">*</span>
              </span>
              <textarea
                className={pdpTextarea}
                placeholder="Your message"
                value={writtenMessage}
                onChange={(e) => setWrittenMessage(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <span className="text-base font-medium text-[#121212]">
                Write a note <span className="font-normal">(+ 50.00 SAR)</span>
              </span>
              <textarea
                className={pdpTextarea}
                placeholder="Card note"
                value={writtenNote}
                onChange={(e) => setWrittenNote(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#121212]">Time field</span>
              <div className="relative">
                <input
                  type="time"
                  className={`${pdpField} pr-11`}
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                />
                <Clock3 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" aria-hidden />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-base font-medium text-[#121212]">Date field</span>
              <div className="relative">
                <input
                  type="date"
                  className={`${pdpField} pr-11`}
                  value={dateLimit}
                  onChange={(e) => setDateLimit(e.target.value)}
                />
                <CalendarClock className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" aria-hidden />
              </div>
            </label>
            <label className="flex flex-col gap-2 md:col-span-2 lg:col-span-1 xl:col-span-2">
              <span className="text-base font-medium text-[#121212]">
                Number of items <span className="font-normal">(+ 10.00 SAR)</span>
              </span>
              <input
                type="number"
                min={0}
                className={`${pdpField} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                value={numberPlate}
                onChange={(e) => setNumberPlate(e.target.value)}
              />
            </label>
          </div>
        ) : null}
      </div>

      <fieldset className="mb-6 border-0 p-0">
        <legend className="mb-1 text-base font-medium text-[#121212]">Price options</legend>
        <PurchaseRadio
          checked={purchaseType === "once"}
          onSelect={() => setPurchaseType("once")}
          label={`One time purchase — ${PRODUCT.price} SAR`}
        />
        <PurchaseRadio
          checked={purchaseType === "subscribe"}
          onSelect={() => setPurchaseType("subscribe")}
          label="Subscribe now and save 25% on this order"
        />
      </fieldset>

      <div className="mb-6">
        <label htmlFor="pdp-qty" className="mb-2 block text-sm font-normal text-[#111]">
          Quantity
        </label>
        <div className="inline-flex h-11 items-stretch border border-[#121212]">
          <button
            type="button"
            className="w-11 text-lg transition-colors hover:bg-[#111] hover:text-white disabled:opacity-30"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            id="pdp-qty"
            className="w-12 border-x border-[#121212] text-center text-sm font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            value={qty}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) setQty(Math.min(99, Math.max(1, n)));
            }}
          />
          <button
            type="button"
            className="w-11 text-lg transition-colors hover:bg-[#111] hover:text-white"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      {PRODUCT.inStock ? (
        <>
          <button
            type="button"
            onClick={addToBasket}
            className="flex h-[52px] w-full items-center justify-center bg-[#121212] text-sm font-medium uppercase tracking-[0.08em] text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
            disabled={!writtenMessage.trim()}
            title={!writtenMessage.trim() ? "Message field is required" : undefined}
          >
            Add to basket
          </button>
          {!writtenMessage.trim() ? (
            <p className="mt-2 text-xs text-[#808080]">
              Fill the required message field in Additional options to enable checkout.
            </p>
          ) : null}
          {addedHint ? (
            <p className="mt-3 text-sm font-medium text-[#121212] animate-fade-in" role="status">
              Added to your bag —{" "}
              <Link href="/cart" className="underline underline-offset-4">
                view cart
              </Link>
            </p>
          ) : null}
        </>
      ) : (
        <OutOfStockPanel />
      )}
    </>
  );
}

function PurchaseRadio({
  checked,
  onSelect,
  label,
}: {
  checked: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-[#121212]">
      <input type="radio" name="purchase" className="sr-only" checked={checked} onChange={onSelect} />
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full border border-[#121212]"
        aria-hidden
      >
        <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${checked ? "bg-[#121212]" : "bg-transparent"}`} />
      </span>
      {label}
    </label>
  );
}

function OutOfStockPanel() {
  return (
    <div className="mt-6 border border-[#121212] bg-[#F8F8F8] p-6">
      <p className="text-lg font-medium">This product is currently not available.</p>
      <p className="mt-2 text-base text-[#555]">Notify me when this product is available</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          required
          placeholder="Email"
          aria-label="Email for stock notification"
          className="h-[52px] flex-1 border border-[#121212] bg-white px-4 text-sm outline-none"
        />
        <button type="submit" className="h-[52px] bg-[#1A1A1A] px-8 text-sm font-medium text-white hover:opacity-90">
          Notify
        </button>
      </form>
    </div>
  );
}
