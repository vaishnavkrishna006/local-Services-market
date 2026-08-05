import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "mint" | "sun" | "clay";
};

export default function Badge({ children, tone = "mint" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
