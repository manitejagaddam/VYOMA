// lib/data.ts - Server-side data fetching for Next.js Server Components
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

function createServerClient() {
  const url = process.env.VYOMA_DB_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VYOMA_DB_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const getDb = cache(createServerClient);

async function fetchRows(table: string, opts: any = {}) {
  const db = getDb();
  if (!db) return [];
  let q = db.from(table).select(opts.select || "*");
  if (opts.filter) Object.entries(opts.filter).forEach(([k, v]) => { q = q.eq(k, v); });
  if (opts.order) q = q.order(opts.order.column, { ascending: opts.order.ascending ?? true });
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return data || [];
}

async function fetchOne(table: string, column: string, value: string) {
  const db = getDb();
  if (!db) return null;
  const { data } = await db.from(table).select("*").eq(column, value).single();
  return data;
}

export const getProjects = cache(() => fetchRows("projects", { filter: { published: true }, order: { column: "order_index" } }));
export const getProjectBySlug = cache((slug: string) => fetchOne("projects", "slug", slug));
export const getServices = cache(() => fetchRows("services", { order: { column: "id" } }));
export const getServiceBySlug = cache((slug: string) => fetchOne("services", "slug", slug));
export const getSolutions = cache(() => fetchRows("solutions", { order: { column: "id" } }));
export const getSolutionBySlug = cache((slug: string) => fetchOne("solutions", "slug", slug));
export const getPosts = cache(() => fetchRows("posts", { filter: { published: true }, order: { column: "published_at", ascending: false } }));
export const getPostBySlug = cache((slug: string) => fetchOne("posts", "slug", slug));
export const getTeamMembers = cache(() => fetchRows("team_members", { order: { column: "order_index" } }));