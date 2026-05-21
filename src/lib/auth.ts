import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";

/**
 * Returns the currently authenticated user (or null). Safe to call from
 * Server Components and Route Handlers.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Checks the `admins` table to see if the given email is permitted to
 * access the admin area. Uses the service-role client because RLS hides
 * the admins table from anon.
 */
export async function isAdminEmail(
  email: string | null | undefined,
): Promise<boolean> {
  if (!email) return false;
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("admins")
    .select("email")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  if (error) {
    console.error("isAdminEmail lookup failed:", error.message);
    return false;
  }
  return Boolean(data);
}

/**
 * Server-component guard. Use at the top of every page under /admin and
 * every server route under /api/admin. Redirects unauthenticated users to
 * /login and authenticated-but-not-allowlisted users to /login?error=not-authorized.
 */
export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!(await isAdminEmail(user.email))) {
    redirect("/login?error=not-authorized");
  }
  return user;
}
