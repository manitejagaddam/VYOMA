/**
 * hooks/useTheme.js — Dark / Light mode with localStorage persistence
 */
import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("vyoma-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("vyoma-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return [theme, toggle];
}

