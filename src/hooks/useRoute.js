/**
 * hooks/useRoute.js — Lightweight client-side router.
 */
import { useState, useEffect } from "react";

export function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const go = (next) => {
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return [path, go];
}

