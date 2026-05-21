-- ============================================================
-- HPO Initiative — initial schema
-- ============================================================
-- Two tables:
--   posts   — field notes and clinical-compass interviews
--   admins  — allowlist of emails permitted to sign in & publish
--
-- Auth model: magic-link sign-in. Anyone can attempt to log in;
-- the application layer enforces that the user's email exists in
-- the `admins` table before granting admin access.
--
-- RLS: anon can read published posts only. All writes go through
-- server-side API routes using the service role key.
-- ============================================================

create extension if not exists "citext";
create extension if not exists "pgcrypto";

-- ---------- posts ----------
create type post_kind as enum ('field_note', 'compass_interview');

create table posts (
  id              uuid primary key default gen_random_uuid(),
  kind            post_kind not null default 'field_note',
  slug            text not null unique,
  title           text not null,
  subtitle        text,
  tag             text,
  byline          text,
  cover_image_url text,
  excerpt         text,
  body            text not null default '',
  read_minutes    int,
  published       boolean not null default false,
  published_at    timestamptz,
  author_email    citext,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index posts_kind_published_idx
  on posts (kind, published, published_at desc);

create index posts_slug_idx on posts (slug);

-- keep updated_at in sync on row updates
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- ---------- admins ----------
create table admins (
  id          uuid primary key default gen_random_uuid(),
  email       citext not null unique,
  added_by    citext,
  created_at  timestamptz not null default now()
);

create index admins_email_idx on admins (email);

-- Seed initial admins
insert into admins (email, added_by) values
  ('mokshita.suresh08@gmail.com', 'seed'),
  ('gongidisahasra@gmail.com',    'seed');

-- ---------- helpers ----------
create or replace function is_admin(check_email text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from admins where email = check_email::citext
  );
$$;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table posts  enable row level security;
alter table admins enable row level security;

-- Anonymous + authenticated: can read only published posts.
create policy "posts_read_published"
  on posts for select
  using (published = true);

-- (No INSERT/UPDATE/DELETE policies. All writes happen via
--  server routes using the service role key, which bypasses RLS.)

-- admins table is invisible to the anon role entirely.
-- No SELECT policy means no rows are visible without service role.
-- (Server routes will read this table to check membership.)
