import type { ReactNode } from "react";
import { Star, StarHalf } from "lucide-react";

type StarsProps = {
  value: number;
  max?: number;
  size?: number;
  className?: string;
};

export function Stars({ value, max = 5, size = 16, className = "" }: StarsProps) {
  const nodes: ReactNode[] = [];
  for (let i = 0; i < max; i += 1) {
    const diff = value - i;
    if (diff >= 1) {
      nodes.push(
        <Star
          key={i}
          size={size}
          className={`shrink-0 fill-[#F5A623] text-[#F5A623] ${className}`}
          aria-hidden
        />,
      );
    } else if (diff >= 0.5) {
      nodes.push(
        <StarHalf
          key={i}
          size={size}
          className={`shrink-0 fill-[#F5A623] text-[#F5A623] ${className}`}
          aria-hidden
        />,
      );
    } else {
      nodes.push(
        <Star
          key={i}
          size={size}
          className="shrink-0 fill-zinc-200 text-zinc-200"
          aria-hidden
        />,
      );
    }
  }
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {nodes}
    </span>
  );
}
