import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Strict whitelist mapping resource slug to table name and order column
const RESOURCE_MAP: Record<string, { table: string; orderColumn: string }> = {
  projects:  { table: "projects",  orderColumn: "order_index" },
  services:  { table: "services",  orderColumn: "order_index" },
  solutions: { table: "solutions", orderColumn: "order_index" },
  posts:     { table: "posts",     orderColumn: "order_index" },
  faqs:      { table: "faqs",      orderColumn: "order_index" },
  team:      { table: "team",      orderColumn: "order_index" },
};

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await context.params;

    // 1. Strict Whitelist Check
    const resourceConfig = RESOURCE_MAP[resource];
    if (!resourceConfig) {
      return NextResponse.json(
        { error: `Resource "${resource}" is not permitted for reordering.` },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.VYOMA_DB_URL;
    const supabaseAnonKey = process.env.VYOMA_DB_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Database configuration is missing." },
        { status: 500 }
      );
    }

    // 2. Authentication Check (SSR Cookies or Authorization Bearer)
    let user: User | null = null;
    const authHeader = request.headers.get("Authorization");
    
    // Create SSR auth client from request cookies
    const authClient = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {},
      },
    });

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const { data, error } = await authClient.auth.getUser(token);
      if (!error && data?.user) {
        user = data.user;
      }
    }

    if (!user) {
      const { data, error } = await authClient.auth.getUser();
      if (!error && data?.user) {
        user = data.user;
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    // 3. Body Validation
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { ids } = body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Request body must contain an 'ids' array with at least one ID." },
        { status: 400 }
      );
    }

    // Verify all IDs are valid numbers / integers
    const parsedIds = ids.map(id => (typeof id === "number" ? id : parseInt(String(id), 10)));
    if (parsedIds.some(id => isNaN(id) || id <= 0)) {
      return NextResponse.json(
        { error: "All IDs must be valid positive integers." },
        { status: 400 }
      );
    }

    // Check for duplicates
    const uniqueIds = new Set(parsedIds);
    if (uniqueIds.size !== parsedIds.length) {
      return NextResponse.json(
        { error: "Duplicate IDs detected in the reorder list." },
        { status: 400 }
      );
    }

    // 4. Verify all IDs belong to the resource in the database
    const dbClient = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
    const { data: existingRecords, error: fetchError } = await dbClient
      .from(resourceConfig.table)
      .select("id")
      .in("id", parsedIds);

    if (fetchError) {
      return NextResponse.json(
        { error: `Failed to verify records: ${fetchError.message}` },
        { status: 500 }
      );
    }

    const existingIdSet = new Set((existingRecords || []).map(r => r.id));
    const missingIds = parsedIds.filter(id => !existingIdSet.has(id));
    if (missingIds.length > 0) {
      return NextResponse.json(
        { error: `Some IDs do not exist in ${resource}: ${missingIds.join(", ")}` },
        { status: 404 }
      );
    }

    // 5. Transactional / Batch Update
    // Try atomic RPC procedure first if configured in DB
    const { error: rpcError } = await dbClient.rpc("reorder_records", {
      target_table: resourceConfig.table,
      id_order: parsedIds,
    });

    if (rpcError) {
      // If RPC is not created yet (e.g. migration pending), execute batch updates
      const updatePromises = parsedIds.map((id, index) =>
        dbClient
          .from(resourceConfig.table)
          .update({ [resourceConfig.orderColumn]: index + 1 })
          .eq("id", id)
      );

      const updateResults = await Promise.all(updatePromises);
      const firstError = updateResults.find(r => r.error)?.error;
      if (firstError) {
        return NextResponse.json(
          {
            error: `Failed to update order in ${resourceConfig.table}: ${firstError.message}. Make sure the ${resourceConfig.orderColumn} column exists (run migration).`,
          },
          { status: 500 }
        );
      }
    }

    // 6. Invalidate Next.js cache so the public site and admin immediately see the new order
    revalidatePath("/", "layout");
    revalidatePath("/admin");
    revalidatePath(`/work`);
    revalidatePath(`/services`);
    revalidatePath(`/solutions`);
    revalidatePath(`/insights`);
    revalidatePath(`/faq`);
    revalidatePath(`/team`);

    return NextResponse.json({
      success: true,
      resource,
      count: parsedIds.length,
      ids: parsedIds,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error during reorder." },
      { status: 500 }
    );
  }
}
