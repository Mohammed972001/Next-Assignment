"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function CartPage() {
  const { lines, updateQuantity, removeLine, clear } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  const subtotal = lines.reduce(
    (sum, row) =>
      sum +
      row.quantity *
        (row.unitPrice +
          row.addons.reduce((a, x) => a + x.price, 0)),
    0,
  );

  return (
    <div className="min-h-screen bg-white text-[#121212]">
      <header className="border-b border-[#121212] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="font-serif text-xl">
            Farah
          </Link>
          <Link href="/" className="text-sm underline underline-offset-4">
            Continue shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
        <h1 className="text-2xl font-medium">Your bag</h1>
        <p className="mt-2 text-sm text-[#555]">
          Update quantities or remove items — changes save automatically.
        </p>

        {lines.length === 0 ? (
          <p className="mt-10 text-sm text-[#808080]">Your bag is empty.</p>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-[#121212]">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-6 animate-fade-in">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-[#121212] bg-[#F8F8F8]">
                    <Image src={line.image} alt="" fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">{line.title}</p>
                    <p className="mt-1 text-xs text-[#555]">
                      {line.color} · {line.size}
                      {line.purchaseType === "subscribe" ? " · Subscription" : ""}
                    </p>
                    {line.addons.length > 0 ? (
                      <p className="mt-1 text-xs text-[#555]">
                        Add-ons: {line.addons.map((a) => a.name).join(", ")}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex h-9 items-stretch border border-[#121212] text-sm">
                        <button
                          type="button"
                          className="w-9 transition-colors hover:bg-zinc-100 disabled:opacity-30"
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="flex w-10 items-center justify-center border-x border-[#121212] font-medium">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-9 transition-colors hover:bg-zinc-100"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-red-700 underline underline-offset-4 transition-opacity hover:opacity-70"
                        onClick={() => removeLine(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium">
                    {(line.unitPrice * line.quantity).toFixed(2)} SAR
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#121212] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium">Subtotal · {subtotal.toFixed(2)} SAR</p>
              <button
                type="button"
                className="h-11 border border-[#121212] px-5 text-sm font-medium transition-colors hover:bg-zinc-50 active:scale-[0.98]"
                onClick={() => setConfirmClear(true)}
              >
                Clear bag
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmClear}
        message="Clear your entire bag?"
        confirmLabel="Clear"
        onConfirm={() => {
          clear();
          setConfirmClear(false);
        }}
        onCancel={() => setConfirmClear(false)}
      />
    </div>
  );
}
