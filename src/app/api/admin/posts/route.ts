import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const user = await requireAdmin();
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["kind", "slug", "title"] as const;
  for (const k of required) {
    if (!body[k] || typeof body[k] !== "string") {
      return NextResponse.json({ error: `Missing required field: ${k}` }, { status: 400 });
    }
  }
  if (body.kind !== "field_note" && body.kind !== "compass_interview") {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const supa = createAdminClient();
  const insert = {
    kind: body.kind,
    slug: body.slug,
    title: body.title,
    subtitle: body.subtitle ?? null,
    tag: body.tag ?? null,
    byline: body.byline ?? null,
    cover_image_url: body.cover_image_url ?? null,
    excerpt: body.excerpt ?? null,
    body: body.body ?? "",
    read_minutes: body.read_minutes ?? null,
    published: Boolean(body.published),
    published_at: body.published ? new Date().toISOString() : null,
    author_email: user.email ?? null,
  };

  const { data, error } = await supa.from("posts").insert(insert).select("*").single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 201 });
}
