import Image from "next/image";

export function LoyaltyStrip() {
  return (
    <div className="flex h-[75px] w-full items-center gap-3.5 border border-[#121212] bg-white px-4 sm:px-5">
      <Image
        src="/Rewards.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 object-contain"
      />
      <p className="text-sm leading-snug text-[#121212]">
        <span className="font-semibold">Rewards</span>
        <span className="font-normal"> +240 points earned by purchasing this product</span>
      </p>
    </div>
  );
}
