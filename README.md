# The HPO Initiative — Next.js app

A small editorial site (Front Page · About · The Practice · Field Notes · Clinical Compass · Volunteer) with a built-in admin area for writing posts. Supabase for auth, database, and storage. Designed to deploy on Vercel.

---

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Supabase** — Postgres for posts + an admin allowlist, Auth for email + password sign-in, Storage for cover images
- **react-markdown + remark-gfm** — renders post bodies
- No Tailwind. The bespoke editorial styling lives in `src/styles/globals.css`.

```
hpo-redesign/
├── middleware.ts                       # Supabase session refresh
├── next.config.mjs
├── package.json
├── supabase/migrations/0001_init.sql   # schema + seed admins
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # root
│   │   ├── page.tsx                    # /
│   │   ├── about/page.tsx              # /about
│   │   ├── practice/page.tsx           # /practice
│   │   ├── field/page.tsx              # /field         (lists field_note posts)
│   │   │   └── [slug]/page.tsx         # /field/<slug>
│   │   ├── compass/page.tsx            # /compass       (lists compass_interview posts)
│   │   │   └── [slug]/page.tsx
│   │   ├── volunteer/page.tsx
│   │   ├── login/                      # email + password sign-in / first-time setup
│   │   ├── auth/callback/route.ts      # Supabase OAuth callback
│   │   ├── admin/                      # gated; only allowlisted emails
│   │   │   ├── page.tsx                #   dashboard
│   │   │   ├── posts/                  #   CRUD
│   │   │   ├── admins/                 #   manage allowlist
│   │   │   └── logout/route.ts
│   │   └── api/admin/                  # JSON routes (write side)
│   ├── components/                     # Masthead, Footer, PostCard, etc.
│   ├── lib/
│   │   ├── supabase/{server,client,admin,middleware}.ts
│   │   ├── auth.ts                     # requireAdmin(), isAdminEmail()
│   │   ├── db.ts                       # post queries
│   │   ├── types.ts
│   │   └── format.ts
│   └── styles/globals.css
```

---

## 1 · Install

```bash
cd hpo-redesign
npm install
```

(or `pnpm install` / `bun install` — pick your favorite.)

## 2 · Create the Supabase project

1. Go to **https://app.supabase.com** → **New project**.
2. Choose a name (e.g. `hpo-initiative`) and a strong DB password.
3. Once it's provisioned, go to **Settings → API** and copy:
   - `Project URL`
   - `anon` public key
   - `service_role` secret key

## 3 · Apply the schema

The migration in `supabase/migrations/0001_init.sql` creates the `posts` and `admins` tables, the helper function `is_admin()`, RLS policies, and seeds the two initial editor emails.

Easiest path — open Supabase Studio → **SQL Editor** → paste the contents of the file → **Run**.

Or with the Supabase CLI:
```bash
supabase link --project-ref <your-ref>
supabase db push
```

> **Initial editors seeded:** `mokshita.suresh08@gmail.com`, `gongidisahasra@gmail.com`. They can add or remove more from `/admin/admins`.

## 4 · Configure Auth

In your Supabase project, go to **Authentication → Providers → Email**:

- **Enable Email** ✓
- **Confirm email** — **OFF** (accounts are created pre-confirmed via the admin API, so no verification email is ever sent)

Then **Authentication → URL Configuration**:

- **Site URL:** `http://localhost:3000` (for local dev). Switch to your Vercel URL after deploy.

Auth is **email + password**. There's no magic link and no verification email — the first-time "Set up your account" flow creates a pre-confirmed user, gated to emails already on the `admins` allowlist.

## 5 · Wire up environment variables

```bash
cp .env.local.example .env.local
```

Fill in:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ…anon…
SUPABASE_SERVICE_ROLE_KEY=eyJ…service-role…
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ The **service-role key** bypasses RLS. It's only read on the server (Route Handlers + Server Components). Never `NEXT_PUBLIC_` it.

## 6 · Run it

```bash
npm run dev
```

Open `http://localhost:3000`. The public pages render with empty states ("The next issue is in copy") until you publish a post.

### First sign-in

1. Visit `http://localhost:3000/login`
2. Click **"First time? Set up your account →"**
3. Enter one of the two seeded emails and pick a password (8+ chars)
4. You're signed in and land at `/admin`. Next time, just use **Sign in** with the same email + password.

## 7 · Posts

`/admin/posts/new` →
- Pick **Kind**: `Field Note` (shows on `/field`) or `Clinical Compass interview` (shows on `/compass`)
- **Slug** auto-fills from the title; editable
- **Cover image URL** — paste any HTTPS image URL
- **Body** — Markdown with GFM (tables, task lists, strikethrough)
- Drafts by default. Flip **Publish** when ready.

## 8 · Admin allowlist

`/admin/admins` →
- Anyone with an allowlisted email can create an account + sign in
- Add an editor → they go to `/login` → "Set up your account" → pick a password → land in `/admin`
- You can't remove yourself, and you can't remove the last admin (both safeguarded server-side)

## 9 · Deploy to Vercel

1. Push the repo to GitHub.
2. **vercel.com → Add New → Project →** import the repo.
3. **Environment Variables** — paste the same four values from `.env.local` (set `NEXT_PUBLIC_SITE_URL` to your `https://*.vercel.app` URL).
4. Deploy.
5. Back in Supabase → **Auth → URL Configuration**, update the **Site URL** to your `https://*.vercel.app` domain.

That's it.

---

## Notes / gotchas

- **Caching:** `/field` and `/compass` list pages revalidate every 60 s. When you publish a post you may see a one-minute delay on the public pages. Detail pages also revalidate at 60 s. Admin pages are `force-dynamic`.
- **Row Level Security:** `posts` is anon-readable only for `published = true`. The `admins` table has no anon policy at all — it's invisible to the public client and only the service-role can read or write it. All admin mutations go through `/api/admin/*` routes that call `requireAdmin()` first.
- **Auth = email + password, allowlist-gated.** Registration only works for emails on the `admins` table, and accounts are created pre-confirmed (no verification email). Sign-in is `supabase.auth.signInWithPassword`; the `/admin` layout re-checks the allowlist server-side on every request. To rotate a forgotten password, use Supabase Studio → Authentication → Users → Reset.
- **Images** are hot-linked from `images.unsplash.com` and `picsum.photos` as placeholders. Replace with your own uploads (Supabase Storage gives you a bucket you can point `cover_image_url` at).
