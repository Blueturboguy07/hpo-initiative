import { createClient } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";
import type { Post, PostKind } from "./types";

/**
 * Public reads — anon client. RLS limits visibility to published rows.
 */

export async function listPublishedPosts(kind?: PostKind, limit = 50): Promise<Post[]> {
  const supabase = await createClient();
  let q = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (kind) q = q.eq("kind", kind);
  const { data, error } = await q;
  if (error) {
    console.error("listPublishedPosts:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("getPublishedPostBySlug:", error.message);
    return null;
  }
  return (data ?? null) as Post | null;
}

/**
 * Admin reads — service role. Includes drafts.
 */

export async function listAllPosts(): Promise<Post[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    console.error("listAllPosts:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getPostById:", error.message);
    return null;
  }
  return (data ?? null) as Post | null;
}
