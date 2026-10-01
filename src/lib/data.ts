// lib/data.ts — Server-side data fetching for Next.js Server Components
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

// Data row types — extend as Supabase schema grows
export type DataRow = Record<string, unknown> & { slug?: string; updated_at?: string };

function createServerClient() {
  // Server-only: uses env vars without framework prefixes
  // These are NEVER sent to the browser unless explicitly mapped.
  const url = process.env.VYOMA_DB_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VYOMA_DB_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const getDb = cache(createServerClient);

type FetchOpts = {
  select?: string;
  filter?: Record<string, unknown>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
};

async function fetchRows(table: string, opts: FetchOpts = {}): Promise<DataRow[]> {
  const db = getDb();
  if (!db) return [];
  let q = db.from(table).select(opts.select || "*");
  if (opts.filter) {
    for (const [k, v] of Object.entries(opts.filter)) {
      q = q.eq(k, v as string);
    }
  }
  if (opts.order) q = q.order(opts.order.column, { ascending: opts.order.ascending ?? true });
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  // Double-cast: Supabase's GenericStringError union doesn't overlap with DataRow,
  // so we go through `unknown` first — this is safe because fetchRows always returns
  // an array of plain objects when Supabase succeeds, or [] on error.
  return (data as unknown as DataRow[]) || [];
}

async function fetchOne(table: string, column: string, value: string): Promise<DataRow | null> {
  const db = getDb();
  if (!db) return null;
  const { data } = await db.from(table).select("*").eq(column, value).single();
  return (data as unknown as DataRow) || null;
}

export const getProjects    = cache(() => fetchRows("projects",     { filter: { published: true }, order: { column: "order_index" } }));
export const getProjectBySlug  = cache((slug: string) => fetchOne("projects",  "slug", slug));
export const getServices    = cache(() => fetchRows("services",     { order: { column: "id" } }));
export const getServiceBySlug  = cache((slug: string) => fetchOne("services",  "slug", slug));
export const getSolutions   = cache(() => fetchRows("solutions",    { order: { column: "id" } }));
export const getSolutionBySlug = cache((slug: string) => fetchOne("solutions", "slug", slug));
export const getPosts       = cache(() => fetchRows("posts",        { filter: { published: true }, order: { column: "published_at", ascending: false } }));
export const getPostBySlug  = cache((slug: string) => fetchOne("posts",     "slug", slug));
export const getTeamMembers = cache(() => fetchRows("team_members", { order: { column: "order_index" } }));
export const getFaqs        = cache(() => fetchRows("faqs",         { order: { column: "order_index" } }));