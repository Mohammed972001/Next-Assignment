import Link from "next/link";

type Crumb = { label: string; href?: string };

type ProductBreadcrumbsProps = {
  items: Crumb[];
};

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] font-medium uppercase leading-none tracking-wide text-[#121212] sm:text-xs lg:text-base"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {idx > 0 ? <span aria-hidden className="text-[#121212]">›</span> : null}
              {item.href ? (
                <Link href={item.href} className="hover:opacity-70">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[#808080]" : "text-[#121212]"}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
