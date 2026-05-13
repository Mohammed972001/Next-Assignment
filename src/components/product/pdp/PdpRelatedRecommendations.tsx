import Image from "next/image";
import Link from "next/link";
import { PRODUCT } from "@/lib/domain/product";

const GRID_SHELL = "mx-auto w-full max-w-[min(100vw,90rem)]";

const GRID_CELL =
  "border-b lg:border-b-0 border-r border-[#121212] sm:max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0";

export function PdpRelatedRecommendations() {
  return (
    <section className="bg-white">
      <div className="hr-full-bleed-t" aria-hidden />
      <div className={GRID_SHELL}>
        <h2 className="py-6 text-center font-sans text-2xl font-medium tracking-tight text-[#121212] sm:py-8 sm:text-3xl">
          You may also like&hellip;
        </h2>
        <div className="hr-full-bleed-t" aria-hidden />
        <ul className="grid list-none grid-cols-1 p-0 lg:grid-cols-4">
          {PRODUCT.related.map((item) => (
            <li key={item.slug} className={GRID_CELL}>
              <Link
                href="/"
                className="group flex h-full flex-col items-center gap-4 p-6 text-inherit no-underline sm:p-8 lg:gap-5"
              >
                <div className="relative flex h-44 w-full max-w-[200px] items-center justify-center sm:h-52 sm:max-w-[220px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1023px) 45vw, 22vw"
                  />
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <p className="text-sm font-semibold text-[#121212] sm:text-base">{item.name}</p>
                  <p className="text-[13px] text-[#808080] sm:text-sm">
                    price {item.price} SAR
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
