// lib/supabase-server.ts � Server-side Supabase (Server Components / Route Handlers)
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

function createServerClient() {
  const url = process.env.VYOMA_DB_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VYOMA_DB_KEY!;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// React cache() deduplicates fetches within a single render tree
export const getSupabaseServer = cache(createServerClient);

