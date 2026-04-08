"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[60px] h-[32px] rounded-full bg-black/10 dark:bg-white/10" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative inline-flex h-[32px] w-[60px] cursor-pointer items-center rounded-full
        border border-transparent bg-black/10 dark:bg-white/10 transition-colors duration-300
        hover:bg-black/20 dark:hover:bg-white/20 focus:outline-none
      `}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`
          flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white dark:bg-[#1a1525]
          shadow-md transform transition-all duration-500 ease-in-out
          ${isDark ? "translate-x-[30px]" : "translate-x-[3px]"}
        `}
      >
        <span
          className={`absolute transform transition-all duration-500 ease-in-out ${
            isDark ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <Sun className="h-4 w-4 text-orange-500" />
        </span>
        <span
          className={`absolute transform transition-all duration-500 ease-in-out ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"
          }`}
        >
          <Moon className="h-4 w-4 text-purple-400" />
        </span>
      </span>
    </button>
  );
}

