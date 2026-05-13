import { ProductBreadcrumbs } from "@/components/product/ProductBreadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PRODUCT } from "@/lib/domain/product";

export function PdpMediaColumn() {
  return (
    <div className="relative min-w-0 w-full shrink-0 lg:w-1/2 lg:max-w-[50%]">
      <div className="px-4 py-3.5 lg:absolute lg:left-8 lg:right-8 lg:top-8 lg:z-10 lg:p-0">
        <ProductBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: PRODUCT.category },
            { label: PRODUCT.name },
          ]}
        />
      </div>
      <ProductGallery images={PRODUCT.images} productName={PRODUCT.name} />
    </div>
  );
}
