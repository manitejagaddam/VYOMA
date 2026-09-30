/**
 * hooks/useImagePreloader.js
 *
 * Strategy:
 * 1. On first app mount, query ALL image-carrying tables from Supabase
 *    (projects, services, solutions) for just their image URL columns.
 * 2. Collect every unique, non-empty URL.
 * 3. Inject <link rel="preload" as="image"> tags into <head> for the top
 *    priority images (first 4 — above the fold on home).
 * 4. For every remaining URL, use `new Image().src = url` to pull each
 *    image into the browser disk/memory cache silently in the background.
 *
 * Result: by the time the user navigates to /services, /work, etc., the
 * browser already has every image cached — zero visible fetch lag.
 */
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Tracks which URLs have already been preloaded (survives re-renders)
const preloaded = new Set();
let preloadStarted = false;

/**
 * Extract all image URLs from a row object.
 * Handles string fields (image_url, banner_url) and
 * array fields (gallery_urls).
 */
function extractUrls(row, keys) {
  const urls = [];
  for (const key of keys) {
    const val = row[key];
    if (!val) continue;
    if (Array.isArray(val)) {
      val.forEach(u => u && typeof u === "string" && urls.push(u));
    } else if (typeof val === "string" && val.startsWith("http")) {
      urls.push(val);
    }
  }
  return urls;
}

/**
 * Preload a single image URL.
 * Uses <link rel="preload"> for priority images,
 * `new Image()` for background ones.
 */
function preloadImage(url, priority = false) {
  if (!url || preloaded.has(url)) return;
  preloaded.add(url);

  if (priority) {
    // Inject a <link rel="preload"> so the browser fetches it at
    // highest priority, even before JS continues.
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.fetchPriority = "high";
    document.head.appendChild(link);
  } else {
    // Background preload — uses the browser image decode pipeline.
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}

/**
 * Stagger background preloads so we don't hammer the network.
 * Loads images in batches of 4, with a 200 ms gap between batches.
 */
function staggeredPreload(urls, batchSize = 4, delayMs = 200) {
  let i = 0;
  function next() {
    const batch = urls.slice(i, i + batchSize);
    if (!batch.length) return;
    batch.forEach(url => preloadImage(url));
    i += batchSize;
    if (i < urls.length) setTimeout(next, delayMs);
  }
  next();
}

export function useImagePreloader() {
  useEffect(() => {
    // Only run once per page session
    if (preloadStarted || !supabase) return;
    preloadStarted = true;

    (async () => {
      try {
        // Fetch image URLs from all tables in parallel — select only URL columns
        const [projectsRes, servicesRes, solutionsRes] = await Promise.all([
          supabase
            .from("projects")
            .select("image_url, banner_url, gallery_urls")
            .eq("published", true),
          supabase
            .from("services")
            .select("image_url"),
          supabase
            .from("solutions")
            .select("image_url"),
        ]);

        const allUrls = [];

        // Projects: card + banner images are most important
        (projectsRes.data || []).forEach(row => {
          allUrls.push(...extractUrls(row, ["image_url", "banner_url", "gallery_urls"]));
        });

        // Services + Solutions
        (servicesRes.data || []).forEach(row => {
          allUrls.push(...extractUrls(row, ["image_url"]));
        });
        (solutionsRes.data || []).forEach(row => {
          allUrls.push(...extractUrls(row, ["image_url"]));
        });

        // De-duplicate
        const unique = [...new Set(allUrls.filter(Boolean))];

        if (!unique.length) return;

        // First 4 get <link rel="preload"> — highest browser priority
        unique.slice(0, 4).forEach(url => preloadImage(url, true));

        // Rest get staggered background preload
        staggeredPreload(unique.slice(4));

        console.log(`[VYOMA] Preloading ${unique.length} images into browser cache.`);
      } catch (err) {
        // Silent — preload failing doesn't break anything
        console.warn("[VYOMA] Image preload failed:", err.message);
      }
    })();
  }, []);
}

