import { clsx } from "clsx";

export function cn(...inputs: Array<string | undefined | false>) {
  return clsx(inputs);
}

export function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export function safeJson<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}
