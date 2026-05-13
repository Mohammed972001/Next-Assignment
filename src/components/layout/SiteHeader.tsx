"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";

type NavItem = {
  href: string;
  label: string;
};

const primaryLeft: NavItem[] = [
  { href: "/", label: "Shop" },
  { href: "/#contact", label: "Contact" },
  { href: "/#language", label: "Language" },
];

const primaryRight: NavItem[] = [
  { href: "/#search", label: "Search" },
  { href: "/#sign-in", label: "Sign in" },
];

function NavLink({ href, label }: NavItem) {
  return (
    <Link
      href={href}
      className="flex h-full min-h-11 w-full items-center justify-center px-4 py-2 text-center text-base font-medium tracking-wide text-black transition-opacity hover:opacity-70"
    >
      {label}
    </Link>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count > 99 ? "99+" : count} items` : "Cart"}
      className="relative flex h-full min-h-11 w-full items-center justify-center px-4 py-2 text-center text-base font-medium tracking-wide text-black transition-opacity hover:opacity-70"
    >
      Cart
      {count > 0 ? (
        <sup className="ms-0.5 text-xs font-semibold leading-none">
          {count > 99 ? "99+" : count}
        </sup>
      ) : null}
    </Link>
  );
}

function LogoMark() {
  return (
    <Link
      href="/"
      className="flex h-full min-h-[44px] items-center justify-center py-2 mx-auto "
      aria-label="Farah home"
    >
      <Image
        src="/logo-farah.svg"
        alt="Farah"
        width={137}
        height={36}
        className="h-8 w-auto max-h-10 md:h-9"
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const { totalItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto w-full  border-b border-[#121212] md:border md:border-[#121212]">
        <div className="flex h-14 items-stretch justify-between border-b border-[#121212] md:hidden">
          <button
            type="button"
            className="flex w-12 shrink-0 items-center justify-center border-r border-[#121212] text-black"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-center border-r border-[#121212] px-3">
            <LogoMark />
          </div>
          <div className="flex w-[88px] shrink-0 items-stretch justify-center">
            <CartLink count={totalItems} />
          </div>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="grid h-[88px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(11rem,1.45fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-black">
            {primaryLeft.map((item) => (
              <li key={item.href + item.label} className="flex min-h-0 items-stretch">
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
            <li key="brand" className="flex min-h-0 min-w-0 items-stretch">
              <LogoMark />
            </li>
            {primaryRight.map((item) => (
              <li key={item.href + item.label} className="flex min-h-0 items-stretch">
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
            <li className="flex min-h-0 items-stretch">
              <CartLink count={totalItems} />
            </li>
          </ul>
        </nav>
      </div>

      {drawerOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 animate-fade-in md:hidden"
            aria-label="Close menu backdrop"
            onClick={() => setDrawerOpen(false)}
          />
          <nav
            id={drawerId}
            className="fixed inset-x-0 top-14 z-40 max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto border-b border-[#121212] bg-white shadow-md animate-slide-up md:hidden"
            aria-label="Mobile primary"
          >
            <ul className="divide-y divide-black">
              {[...primaryLeft, ...primaryRight].map((item) => (
                <li key={`m-${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center px-5 text-base font-medium text-black"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cart"
                  className="flex min-h-12 items-center px-5 text-base font-medium text-black"
                  onClick={() => setDrawerOpen(false)}
                >
                  Cart
                  {totalItems > 0 ? (
                    <span className="ms-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  ) : null}
                </Link>
              </li>
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
