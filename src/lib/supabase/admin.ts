import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. ONLY use from server code (Route Handlers,
 * Server Actions). The service-role key bypasses Row Level Security, so this
 * must never leak to the browser.
 *
 * Used for:
 *   - reading the `admins` allowlist (which is invisible to anon)
 *   - all writes against `posts` and `admins`
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
