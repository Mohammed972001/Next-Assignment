import { Zap } from "lucide-react";

const line = "Summer Sale: Up to 70% off selected items";

function AnnouncementItem() {
  return (
    <li className="flex shrink-0 items-center gap-2 text-center font-sans text-base font-normal leading-[100%] tracking-[1.2px] text-white">
      <Zap className="size-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
      <span className="whitespace-nowrap">{line}</span>
    </li>
  );
}

function AnnouncementGroup({ groupKey, ariaHidden }: { groupKey: string; ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 list-none items-center gap-12 px-6 sm:gap-16 sm:px-10 md:gap-20 md:px-12"
      aria-hidden={ariaHidden}
    >
      {[0, 1, 2].map((i) => (
        <AnnouncementItem key={`${groupKey}-${i}`} />
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <aside aria-label="Promotions" className="bg-black py-2.5 text-white sm:py-3">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-announcement motion-reduce:animate-none">
          <AnnouncementGroup groupKey="set-a" />
          <AnnouncementGroup groupKey="set-b" ariaHidden />
        </div>
      </div>
    </aside>
  );
}
