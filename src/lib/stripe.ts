import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY ?? "";

export const stripe = new Stripe(secretKey, {
  apiVersion: "2024-06-20"
});

export const platformFeePercent = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT ?? 8);

export function calculatePlatformFee(amountCents: number) {
  return Math.round((amountCents * platformFeePercent) / 100);
}
