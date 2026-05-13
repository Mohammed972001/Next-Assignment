"use client";

import { useCallback, useMemo, useState } from "react";
import { PRODUCT } from "@/lib/domain/product";
import type { PurchaseType } from "@/lib/domain/types";
import { useCart } from "@/hooks/useCart";

export function usePdpForm() {
  const { addLine } = useCart();

  const [qty, setQty] = useState(1);
  const [colorId, setColorId] = useState<string>(PRODUCT.colors[0]?.id ?? "black");
  const [size, setSize] = useState<(typeof PRODUCT.sizes)[number]>("M");
  const [selectedUpsellIds, setSelectedUpsellIds] = useState<Set<string>>(() => new Set());
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [floralOption, setFloralOption] = useState("");
  const [additionalOption, setAdditionalOption] = useState("");
  const [writtenMessage, setWrittenMessage] = useState("");
  const [writtenNote, setWrittenNote] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [dateLimit, setDateLimit] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("once");
  const [addedHint, setAddedHint] = useState(false);

  const selectedUpsells = useMemo(
    () => PRODUCT.upsells.filter((u) => selectedUpsellIds.has(u.id)),
    [selectedUpsellIds],
  );

  const colorLabel = useMemo(
    () => PRODUCT.colors.find((c) => c.id === colorId)?.label ?? colorId,
    [colorId],
  );

  const toggleUpsell = useCallback((id: string) => {
    setSelectedUpsellIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addToBasket = useCallback(() => {
    addLine({
      productId: PRODUCT.id,
      title: `${PRODUCT.name} — ${PRODUCT.price} SR`,
      image: PRODUCT.images[0] ?? "",
      unitPrice: PRODUCT.price,
      quantity: qty,
      color: colorLabel,
      size,
      addons: selectedUpsells.map((u) => ({ id: u.id, name: u.name, price: u.price })),
      customMessage: writtenMessage,
      customNote: writtenNote,
      deliveryDate: dateLimit,
      deliveryTime: timeLimit,
      extraItemsCount: numberPlate,
      floralOption,
      additionalOption,
      purchaseType,
    });
    setAddedHint(true);
    window.setTimeout(() => setAddedHint(false), 2400);
  }, [
    addLine,
    qty,
    colorLabel,
    size,
    selectedUpsells,
    writtenMessage,
    writtenNote,
    dateLimit,
    timeLimit,
    numberPlate,
    floralOption,
    additionalOption,
    purchaseType,
  ]);

  return {
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
    selectedUpsells,
    colorLabel,
    addToBasket,
  };
}

export type PdpForm = ReturnType<typeof usePdpForm>;
