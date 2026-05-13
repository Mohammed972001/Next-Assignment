import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductExperience } from "@/components/product/ProductExperience";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <AnnouncementBar />
      <main className="min-h-0 flex-1">
        <ProductExperience />
      </main>
      <SiteFooter />
    </>
  );
}
