// lib/supabase.ts � Client-side Supabase (browser)
import { createClient } from "@supabase/supabase-js";

const url = process.env.VYOMA_DB_URL!;
const key = process.env.VYOMA_DB_KEY!;

if (!url || !key) {
  console.warn("[VYOMA] Supabase env vars missing. Set VYOMA_DB_URL and VYOMA_DB_KEY");
}

export const supabase = url && key ? createClient(url, key) : null;

