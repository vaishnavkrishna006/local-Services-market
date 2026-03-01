import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f1419",
        ocean: "#0b2b3c",
        mist: "#f4f7fb",
        clay: "#d9785b",
        mint: "#9ad1c8",
        sun: "#f8c35b"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        soft: "0 10px 40px rgba(12, 32, 56, 0.12)",
        card: "0 12px 30px rgba(15, 20, 25, 0.12)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(1200px circle at 20% 20%, #f8c35b55, transparent 60%), radial-gradient(900px circle at 80% 20%, #9ad1c855, transparent 55%), linear-gradient(180deg, #f4f7fb, #ffffff 60%)"
      }
    }
  },
  plugins: []
};

export default config;
