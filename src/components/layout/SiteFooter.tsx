"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const GRID_SHELL = "mx-auto w-full max-w-[min(100vw,90rem)]";

const GRID_CELL =
  "border-b border-r border-[#121212] max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0";

const ICON_CLASS = "h-5 w-5 cursor-pointer transition-opacity hover:opacity-60";

const SOCIAL_ICONS: { label: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Snapchat",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3c2.5 0 4 1.6 4 4.2 0 .4.1.8.3 1.1.2.4.8.5 1.3.6 1.2.2 2.4.5 2.4 2.1 0 1.1-.7 1.9-1.8 2.2-.3.1-.5.4-.4.7.2.6.3 1.2.3 1.8 0 2.1-2.5 3.3-6.1 3.3s-6.1-1.2-6.1-3.3c0-.6.1-1.2.3-1.8.1-.3-.1-.6-.4-.7-1.1-.3-1.8-1.1-1.8-2.2 0-1.6 1.2-1.9 2.4-2.1.5-.1 1.1-.2 1.3-.6.2-.3.3-.7.3-1.1C8 4.6 9.5 3 12 3z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7v3.1h2.4V22h4.1z" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    icon: (
      <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21 5L2 12.5l7 2 3 7L21 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const LINK_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Shop",
    items: [
      "All Products",
      "Fresh Flowers",
      "Dried Flowers",
      "Live Plants",
      "Designer Vases",
      "Aroma Candles",
      "Freshener Diffuser",
    ],
  },
  { title: "Service", items: ["Flower Subscription", "Wedding & Event Decor"] },
];

const aboutLinks = [
  "Our story",
  "Blog",
  "Shipping & returns",
  "Terms & conditions",
  "Privacy policy",
];

type AboutPaymentSlot =
  | { kind: "one"; file: string; alt: string }
  | { kind: "pair"; left: { file: string; alt: string }; right: { file: string; alt: string } };

/** Order matches design: Tabby, Mastercard+Visa, Apple Pay, mada, Tamara */
const ABOUT_PAYMENT_ROW: AboutPaymentSlot[] = [
  { kind: "one", file: "tabby.svg", alt: "Tabby" },
  {
    kind: "pair",
    left: { file: "Mastercard svg.svg", alt: "Mastercard" },
    right: { file: "Visa Inc.svg", alt: "Visa" },
  },
  { kind: "one", file: "apppay.svg", alt: "Apple Pay" },
  { kind: "one", file: "mada.svg", alt: "mada" },
  { kind: "one", file: "tamara.svg", alt: "Tamara" },
];

function abutusSrc(file: string) {
  return `/abutus/${encodeURIComponent(file)}`;
}

function AboutUsLinkBlock() {
  return (
    <div>
      <h3 className="font-sans text-[22px] font-normal text-[#808080]">About Us</h3>
      <ul className="mt-4 list-none space-y-3 p-0">
        {aboutLinks.map((label) => (
          <li key={label} className={label === "Shipping & returns" ? "mt-6" : undefined}>
            <Link
              href="/"
              className="font-sans text-[16px] font-medium leading-[100%] tracking-wide text-[#121212] hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AboutPaymentBadge({ file, alt }: { file: string; alt: string }) {
  return (
    <Image
      src={abutusSrc(file)}
      alt={alt}
      width={72}
      height={28}
      className="h-[24px] w-auto shrink-0 object-contain"
    />
  );
}

function LinkList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-[22px] font-normal text-[#808080]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((label) => (
          <li key={label}>
            <Link
              href="/"
              className="font-sans text-[16px] font-medium leading-[100%] tracking-wide text-[#121212] hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="hr-full-bleed-t" aria-hidden />
      <div className={GRID_SHELL}>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className={`flex flex-col gap-4 p-6 sm:p-8 ${GRID_CELL}`}>
            <Link href="/" className="inline-block w-fit" aria-label="Farah home">
              <Image
                src="/logo-farah.svg"
                alt="Farah"
                width={137}
                height={36}
                className="h-8 w-auto max-h-10 md:h-9"
              />
            </Link>
            <p className="font-sans text-base font-normal leading-[100%] tracking-normal text-[#121212]">
              Remember to offer beautiful flowers suitable for every occasion. We handcraft each
              bouquet with care and deliver across the Kingdom.
            </p>
          </div>

          <div className={`flex flex-col gap-5 p-6 sm:p-8 ${GRID_CELL}`}>
            <h3 className="text-sm font-medium text-[#808080]">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-[#808080]">Address</p>
                <p className="mt-1 font-medium text-[#121212]">15/4 Xyz, Riyadh</p>
              </div>
              <div>
                <p className="text-xs text-[#808080]">Phone</p>
                <a href="tel:+966000000000" className="mt-1 block font-medium text-[#121212] hover:underline">
                  +966 00 000 0000
                </a>
              </div>
              <div>
                <p className="text-xs text-[#808080]">General Enquiry:</p>
                <a href="mailto:hello@farahflowers.com" className="mt-1 block font-medium text-[#121212] hover:underline">
                  hello@farahflowers.com
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#808080]">Follow Us</p>
              <div className="mt-3 flex flex-wrap gap-3 text-[#121212]">
                {SOCIAL_ICONS.map(({ label, icon }) => (
                  <a key={label} href="#" aria-label={label}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-6 p-6 sm:p-8 ${GRID_CELL}`}>
            {LINK_GROUPS.map(({ title, items }) => (
              <LinkList key={title} title={title} items={items} />
            ))}
          </div>

          <div className={`flex flex-col gap-10 p-6 text-left sm:p-8 ${GRID_CELL}`}>
            <AboutUsLinkBlock />
            <div className="flex flex-col gap-5">
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                {ABOUT_PAYMENT_ROW.map((slot, i) =>
                  slot.kind === "pair" ? (
                    <div key={i} className="flex shrink-0 items-center gap-1">
                      <AboutPaymentBadge {...slot.left} />
                      <AboutPaymentBadge {...slot.right} />
                    </div>
                  ) : (
                    <AboutPaymentBadge key={slot.file} file={slot.file} alt={slot.alt} />
                  ),
                )}
              </div>
              <div className="flex flex-row items-center gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={abutusSrc("VAT.svg")}
                    alt="VAT"
                    width={36}
                    height={36}
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                  <div className="font-sans text-xs leading-tight">
                    <p className="text-[#808080]">VAT Number</p>
                    <p className="mt-0.5 font-medium text-[#121212]">XXXXXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={abutusSrc("Group 7134.svg")}
                    alt="Saudi Business Center"
                    width={36}
                    height={36}
                    className="h-8 w-8 shrink-0 object-contain"
                  />
                  <div className="font-sans text-xs leading-tight">
                    <p className="text-[#808080]">Saudi Business Center</p>
                    <p className="mt-0.5 font-medium text-[#121212]">XXXXXXXXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
