import Image from "next/image";

const CARDS = [
  {
    src: "/tappy.svg",
    alt: "Tabby",
    body: (
      <>
        4 payments of SAR 22.50/month — no interest, no fees.{" "}
        <a href="#" className="underline underline-offset-2">
          Learn more
        </a>
      </>
    ),
  },
  {
    src: "/tamara.svg",
    alt: "Tamara",
    body: (
      <>
        Split into 3 payments of SAR 30.00 — no interest, no fees.{" "}
        <a href="#" className="underline underline-offset-2">
          Learn more
        </a>
      </>
    ),
  },
] as const;

export function PaymentInstallmentCards() {
  return (
    <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6 sm:pt-1">
      {CARDS.map(({ src, alt, body }) => (
        <div
          key={src}
          className="relative rounded border border-[#121212] bg-white px-3 pb-3.5 pt-6 text-[12px] leading-relaxed text-[#0A0C10]"
        >
          <div className="pointer-events-none absolute left-3 top-0 z-10 -translate-y-1/2 sm:left-4">
            <Image
              src={src}
              alt={alt}
              width={56}
              height={22}
              className="pointer-events-auto h-6 w-auto object-contain object-left sm:h-7"
            />
          </div>
          <p className="min-w-0">{body}</p>
        </div>
      ))}
    </div>
  );
}
