import { clsx } from "clsx";

export function cn(...inputs: Array<string | undefined | false>) {
  return clsx(inputs);
}

export function formatMoney(cents: number, currency = "inr") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export function safeJson<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}
