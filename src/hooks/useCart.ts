"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { CartLine } from "@/lib/domain/types";
import {
  addCartLine,
  clearCart,
  getCartSnapshot,
  removeCartLine,
  subscribeCart,
  updateCartQuantity,
} from "@/lib/cart-store";

const EMPTY_CART: CartLine[] = [];

function getServerSnapshot(): CartLine[] {
  return EMPTY_CART;
}

export function useCart() {
  const lines = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerSnapshot);

  const totalItems = useMemo(
    () => lines.reduce((acc, row) => acc + row.quantity, 0),
    [lines],
  );

  const addLine = useCallback((line: Omit<CartLine, "id">) => {
    addCartLine(line);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
  }, []);

  const removeLine = useCallback((id: string) => {
    removeCartLine(id);
  }, []);

  const clear = useCallback(() => {
    clearCart();
  }, []);

  return {
    lines,
    totalItems,
    addLine,
    updateQuantity,
    removeLine,
    clear,
  };
}
