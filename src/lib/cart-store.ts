import type { CartLine } from "@/lib/domain/types";
import { STORAGE_CART } from "@/lib/domain/product";
import { createId } from "@/lib/ids";

const EVENT = "farah-cart";

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as CartLine[];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  cachedCart = lines;
  window.localStorage.setItem(STORAGE_CART, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVENT));
}

let cachedCart: CartLine[] | null = null;

export function getCartSnapshot(): CartLine[] {
  if (cachedCart === null) {
    cachedCart = readCart();
  }
  return cachedCart;
}

export function subscribeCart(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_CART || e.key === null) {
      cachedCart = null;
      onStoreChange();
    }
  };
  const onLocal = () => onStoreChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onLocal);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onLocal);
  };
}

export function addCartLine(line: Omit<CartLine, "id">) {
  const next: CartLine = { ...line, id: createId() };
  writeCart([...readCart(), next]);
}

export function updateCartQuantity(id: string, quantity: number) {
  const q = Math.max(1, Math.min(99, quantity));
  const next = readCart().map((row) =>
    row.id === id ? { ...row, quantity: q } : row,
  );
  writeCart(next);
}

export function removeCartLine(id: string) {
  writeCart(readCart().filter((row) => row.id !== id));
}

export function clearCart() {
  writeCart([]);
}
