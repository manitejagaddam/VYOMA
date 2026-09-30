// lib/supabase.ts � Client-side Supabase (browser)
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !key) {
  console.warn("[VYOMA] Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = url && key ? createClient(url, key) : null;

