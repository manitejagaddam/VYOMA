import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VYOMA_DB_URL;
const supabaseAnonKey = process.env.VYOMA_DB_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[VYOMA] Supabase env vars missing. Using local fallback data.\n" +
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

