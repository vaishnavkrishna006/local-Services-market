import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn("button", variant, className)} {...props} />;
}
