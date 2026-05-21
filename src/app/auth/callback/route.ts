import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

/**
 * Magic-link callback. Supabase redirects the user here after they click
 * the link in their email. We exchange the one-time code for a session,
 * then either route them to /admin (if allowlisted) or back to /login.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=callback-failed`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("exchangeCodeForSession:", error.message);
    return NextResponse.redirect(`${origin}/login?error=callback-failed`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdminEmail(user?.email))) {
    // Sign them out so a non-admin login doesn't leave a stale session behind.
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=not-authorized`);
  }

  return NextResponse.redirect(`${origin}/admin`);
}
