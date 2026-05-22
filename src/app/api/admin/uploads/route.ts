import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "post-covers";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

/**
 * POST /api/admin/uploads
 * multipart/form-data, field name "file".
 * Returns { url } pointing at the public Supabase Storage object.
 *
 * Requires a public bucket named `post-covers` in Supabase Storage.
 */
export async function POST(request: Request) {
  await requireAdmin();

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form body" }, { status: 400 });
  }
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB > 10 MB cap).` },
      { status: 413 },
    );
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type: ${file.type || "unknown"}. Use jpg, png, webp, gif, or avif.` },
      { status: 415 },
    );
  }

  const extFromName = file.name.includes(".") ? file.name.split(".").pop()! : "";
  const extFromType = file.type.split("/")[1] ?? "bin";
  const ext = (extFromName || extFromType).toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const supa = createAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supa.storage.from(BUCKET).upload(key, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    // The most common cause is a missing public bucket. Surface the real message.
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data } = supa.storage.from(BUCKET).getPublicUrl(key);
  return NextResponse.json({ url: data.publicUrl, key });
}
