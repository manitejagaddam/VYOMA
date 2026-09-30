/**
 * lib/utils.js
 * shadcn/ui-compatible `cn` utility — merges Tailwind classes intelligently.
 * Uses clsx for conditional classes + tailwind-merge to resolve conflicts.
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

