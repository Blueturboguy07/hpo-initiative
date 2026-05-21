import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAdmin();
  const { id } = await params;

  const supa = createAdminClient();

  // Block self-removal so an account can't accidentally lock itself out.
  const { data: row } = await supa.from("admins").select("email").eq("id", id).maybeSingle();
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (row.email.toLowerCase() === (user.email ?? "").toLowerCase()) {
    return NextResponse.json(
      { error: "You can't remove yourself. Ask another admin to do it." },
      { status: 400 },
    );
  }

  // Block removing the last admin.
  const { count } = await supa
    .from("admins")
    .select("*", { count: "exact", head: true });
  if ((count ?? 0) <= 1) {
    return NextResponse.json(
      { error: "Can't remove the last admin." },
      { status: 400 },
    );
  }

  const { error } = await supa.from("admins").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
