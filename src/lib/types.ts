export type PostKind = "field_note" | "compass_interview";

export type Post = {
  id: string;
  kind: PostKind;
  slug: string;
  title: string;
  subtitle: string | null;
  tag: string | null;
  byline: string | null;
  cover_image_url: string | null;
  excerpt: string | null;
  body: string;
  read_minutes: number | null;
  published: boolean;
  published_at: string | null;
  author_email: string | null;
  created_at: string;
  updated_at: string;
};

export type Admin = {
  id: string;
  email: string;
  added_by: string | null;
  created_at: string;
};

export const POST_KIND_LABEL: Record<PostKind, string> = {
  field_note: "Field Note",
  compass_interview: "Clinical Compass",
};
