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

import { 
  FALLBACK_PROJECTS, 
  FALLBACK_SERVICES, 
  FALLBACK_SOLUTIONS, 
  FALLBACK_POSTS, 
  FALLBACK_TEAM, 
  FALLBACK_FAQS 
} from "./fallback";

export const getProjects = cache(async () => {
  const rows = await fetchRows("projects", { filter: { published: true }, order: { column: "order_index" } });
  return rows.length > 0 ? rows : (FALLBACK_PROJECTS as unknown as DataRow[]);
});
export const getProjectBySlug = cache(async (slug: string) => {
  const row = await fetchOne("projects", "slug", slug);
  return row || (FALLBACK_PROJECTS.find(x => x.slug === slug) as unknown as DataRow) || null;
});
export const getServices = cache(async () => {
  const rows = await fetchRows("services", { order: { column: "id" } });
  return rows.length > 0 ? rows : (FALLBACK_SERVICES as unknown as DataRow[]);
});
export const getServiceBySlug = cache(async (slug: string) => {
  const row = await fetchOne("services", "slug", slug);
  return row || (FALLBACK_SERVICES.find(x => x.slug === slug) as unknown as DataRow) || null;
});
export const getSolutions = cache(async () => {
  const rows = await fetchRows("solutions", { order: { column: "id" } });
  return rows.length > 0 ? rows : (FALLBACK_SOLUTIONS as unknown as DataRow[]);
});
export const getSolutionBySlug = cache(async (slug: string) => {
  const row = await fetchOne("solutions", "slug", slug);
  return row || (FALLBACK_SOLUTIONS.find(x => x.slug === slug) as unknown as DataRow) || null;
});
export const getPosts = cache(async () => {
  const rows = await fetchRows("posts", { filter: { published: true }, order: { column: "published_at", ascending: false } });
  return rows.length > 0 ? rows : (FALLBACK_POSTS as unknown as DataRow[]);
});
export const getPostBySlug = cache(async (slug: string) => {
  const row = await fetchOne("posts", "slug", slug);
  return row || (FALLBACK_POSTS.find(x => x.slug === slug) as unknown as DataRow) || null;
});
export const getTeamMembers = cache(async () => {
  const members = await fetchRows("team", { order: { column: "order_index" } });
  return members.length > 0 ? members : (FALLBACK_TEAM as unknown as DataRow[]);
});
export const getFaqs = cache(async () => {
  const rows = await fetchRows("faqs", { order: { column: "order_index" } });
  return rows.length > 0 ? rows : (FALLBACK_FAQS as unknown as DataRow[]);
});