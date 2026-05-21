import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const supa = createAdminClient();

  // Determine if we're publishing for the first time so we can stamp published_at.
  const { data: existing } = await supa
    .from("posts")
    .select("published, published_at")
    .eq("id", id)
    .maybeSingle();
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const willPublish = Boolean(body.published);
  const publishedAt =
    willPublish && !existing.published
      ? new Date().toISOString()
      : willPublish
      ? existing.published_at
      : null;

  const patch: Record<string, unknown> = {};
  const allowed = [
    "kind",
    "slug",
    "title",
    "subtitle",
    "tag",
    "byline",
    "cover_image_url",
    "excerpt",
    "body",
    "read_minutes",
    "published",
  ] as const;
  for (const k of allowed) {
    if (k in body) patch[k] = body[k];
  }
  if ("published" in body) patch.published_at = publishedAt;

  const { data, error } = await supa
    .from("posts")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await params;
  const supa = createAdminClient();
  const { error } = await supa.from("posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
