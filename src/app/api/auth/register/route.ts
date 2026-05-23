import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/auth/register  { email, password }
 *
 * First-time account setup. Only emails already on the `admins` allowlist
 * may register. Creates a Supabase auth user with the password, pre-confirmed
 * (no verification email). After this succeeds the client signs in normally
 * with signInWithPassword.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  // Gate registration to the editor allowlist.
  if (!(await isAdminEmail(email))) {
    return NextResponse.json(
      { error: "That email isn't on the editor allowlist." },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // pre-confirm — no verification email
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
      return NextResponse.json(
        { error: "An account already exists for that email. Just sign in." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
