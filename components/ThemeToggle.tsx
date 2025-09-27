"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const current = theme ?? resolvedTheme ?? "system";

  function handleToggle() {
    if (current === "light") setTheme("dark");
    else if (current === "dark") setTheme("system");
    else setTheme("light");
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-xl border px-3 py-1 text-sm hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {current === "light" && (<><Sun className="h-4 w-4"/> Light</>)}
      {current === "dark" && (<><Moon className="h-4 w-4"/> Dark</>)}
      {current === "system" && (<><Laptop className="h-4 w-4"/> System</>)}
    </button>
  );
}
