import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    console.log("Theme is now:", theme, resolvedTheme);
  }, [theme, resolvedTheme]);

  return (
    <button
      onClick={() => {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        console.log("Switching to", nextTheme);
        setTheme(nextTheme);
      }}
      className="relative p-2 flex items-center justify-center rounded-md transition-colors hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
    >
      <Sun className="h-[14px] w-[14px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[14px] w-[14px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
