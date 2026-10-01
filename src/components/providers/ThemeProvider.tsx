"use client";
// components/providers/ThemeProvider.tsx
// Reads localStorage on mount to avoid flash; sets theme BEFORE first paint
// using an inline script in layout.tsx (for zero-FOUC), with React state
// synced on mount for toggle functionality.
import { createContext, useContext, useState, useLayoutEffect } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage synchronously on client via lazy initializer
  // to avoid setState-inside-effect ESLint error.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("vyoma-theme") as Theme) || "dark";
  });

  // useLayoutEffect (not useEffect) so DOM update is synchronous before paint
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("vyoma-theme", next);
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
