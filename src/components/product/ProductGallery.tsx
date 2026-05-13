"use client";

import Image from "next/image";

type ProductGalleryProps = {
  images: readonly string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const mainSrc = images[0] ?? "";

  return (
    <div className="relative w-full">
      <div className="relative mx-auto aspect-square w-full max-w-[min(100vw,45rem)] overflow-hidden bg-[#F8F8F8] lg:mx-0 lg:max-w-full">
        <Image
          src={mainSrc}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1023px) min(100vw, 45rem), 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
