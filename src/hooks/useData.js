/**
 * hooks/useData.js
 * DB-first data hook with 10-minute in-memory cache.
 * No fallback data – everything comes from Supabase.
 */
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const queryCache = new Map();

function getCacheKey(table, options) {
  return JSON.stringify({ table, options });
}

export function useSupabaseQuery(table, options = {}) {
  const cacheKey = getCacheKey(table, options);

  const [data, setData] = useState(() => {
    const cached = queryCache.get(cacheKey);
    return cached && (Date.now() - cached.timestamp < CACHE_TTL_MS) ? cached.data : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = queryCache.get(cacheKey);
    return !(cached && Date.now() - cached.timestamp < CACHE_TTL_MS);
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = queryCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(cached.data);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        let query = supabase.from(table).select(options.select || "*");
        if (options.filter) {
          Object.entries(options.filter).forEach(([col, val]) => {
            query = query.eq(col, val);
          });
        }
        if (options.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending ?? true,
          });
        }
        if (options.limit) query = query.limit(options.limit);

        const { data: rows, error: err } = await query;
        if (cancelled) return;
        if (err) throw err;

        const finalData = rows || [];
        queryCache.set(cacheKey, { data: finalData, timestamp: Date.now() });
        setData(finalData);
      } catch (err) {
        if (!cancelled) {
          console.error(`[VYOMA] DB error on "${table}":`, err.message);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return { data, loading, error };
}

/** Invalidate a table's cache so next fetch is fresh (call after admin saves) */
export function invalidateCache(table) {
  for (const key of queryCache.keys()) {
    try {
      const parsed = JSON.parse(key);
      if (parsed.table === table) queryCache.delete(key);
    } catch { queryCache.delete(key); }
  }
}

