import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";
import { formatBylineDate } from "@/lib/format";
import AdminsManager from "./AdminsManager";
import type { Admin } from "@/lib/types";

export const dynamic = "force-dynamic";

async function listAdmins(): Promise<Admin[]> {
  const supa = createAdminClient();
  const { data, error } = await supa
    .from("admins")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("listAdmins:", error.message);
    return [];
  }
  return (data ?? []) as Admin[];
}

export default async function AdminsPage() {
  const me = await getCurrentUser();
  const admins = await listAdmins();

  return (
    <>
      <h1>Editor <em>allowlist.</em></h1>
      <p className="lede">
        Anyone with an email on this list can sign in and publish. Add an editor, then ask them to visit{" "}
        <span style={{ fontFamily: "var(--mono)", fontSize: 13 }}>/login</span> and enter their email.
      </p>

      <AdminsManager
        initialAdmins={admins.map((a) => ({
          id: a.id,
          email: a.email,
          added_by: a.added_by,
          created_at: formatBylineDate(a.created_at),
        }))}
        currentEmail={me?.email ?? ""}
      />
    </>
  );
}
