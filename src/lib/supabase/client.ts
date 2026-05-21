import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase singleton for use in Client Components.
 * Used for magic-link sign-in from the /login page.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
