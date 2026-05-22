"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostKind } from "@/lib/types";
import { slugify } from "@/lib/format";

type Props = {
  mode: "new" | "edit";
  post?: Post;
};

export default function PostEditor({ mode, post }: Props) {
  const router = useRouter();

  const [kind, setKind] = useState<PostKind>(post?.kind ?? "field_note");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [subtitle, setSubtitle] = useState(post?.subtitle ?? "");
  const [tag, setTag] = useState(post?.tag ?? "");
  const [byline, setByline] = useState(post?.byline ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [readMinutes, setReadMinutes] = useState<string>(
    post?.read_minutes ? String(post.read_minutes) : "",
  );
  const [published, setPublished] = useState(post?.published ?? false);

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-uploading the same file later
    if (!file) return;
    setUploading(true);
    setUploadError(null);

    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setUploading(false);

    if (!res.ok || !data.url) {
      setUploadError(data.error ?? `Upload failed (${res.status})`);
      return;
    }
    setCoverImageUrl(data.url);
  }

  // Auto-fill slug from title while it hasn't been hand-edited.
  const [slugLocked, setSlugLocked] = useState(mode === "edit");
  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugLocked) setSlug(slugify(v));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg(null);

    const payload = {
      kind,
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      subtitle: subtitle.trim() || null,
      tag: tag.trim() || null,
      byline: byline.trim() || null,
      cover_image_url: coverImageUrl.trim() || null,
      excerpt: excerpt.trim() || null,
      body,
      read_minutes: readMinutes ? Number(readMinutes) : null,
      published,
    };

    const url = mode === "new" ? "/api/admin/posts" : `/api/admin/posts/${post!.id}`;
    const method = mode === "new" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (!res.ok) {
      setMsg({ kind: "err", text: data.error ?? res.statusText });
      return;
    }

    if (mode === "new" && data.id) {
      router.push(`/admin/posts/${data.id}`);
    } else {
      setMsg({ kind: "ok", text: "Saved." });
      router.refresh();
    }
  }

  return (
    <form className="editor-grid" onSubmit={onSubmit}>
      <div className="editor-main form-card">
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title" type="text" required
            value={title} onChange={(e) => onTitleChange(e.target.value)}
            placeholder="The quiet epidemic"
          />
        </div>

        <div className="form-row two">
          <div>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug" type="text" required
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugLocked(true); }}
              placeholder="the-quiet-epidemic"
            />
            <div className="hint">URL: /{kind === "field_note" ? "field" : "compass"}/{slug || "slug"}</div>
          </div>
          <div>
            <label htmlFor="kind">Kind</label>
            <select id="kind" value={kind} onChange={(e) => setKind(e.target.value as PostKind)}>
              <option value="field_note">Field Note</option>
              <option value="compass_interview">Clinical Compass interview</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="subtitle">Subtitle (optional)</label>
          <input
            id="subtitle" type="text"
            value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
            placeholder="One sentence under the headline."
          />
        </div>

        <div className="form-row two">
          <div>
            <label htmlFor="tag">Tag</label>
            <input id="tag" type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Cardiovascular" />
          </div>
          <div>
            <label htmlFor="byline">Byline</label>
            <input id="byline" type="text" value={byline} onChange={(e) => setByline(e.target.value)} placeholder="A. Mensah, M2" />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt" rows={3}
            value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            style={{ minHeight: 80 }}
            placeholder="One or two sentences shown on the index page."
          />
        </div>

        <div className="form-row">
          <label htmlFor="body">Body (Markdown)</label>
          <textarea
            id="body" required
            value={body} onChange={(e) => setBody(e.target.value)}
            placeholder={"## Subhead\n\nWrite in markdown. Use **bold**, _italic_, [links](https://example.com), > blockquotes, and lists."}
          />
          <div className="hint">Markdown + GitHub-flavored extensions (tables, strikethrough, task lists).</div>
        </div>

        {msg && <div className={`form-msg ${msg.kind}`}>{msg.text}</div>}
      </div>

      <aside className="editor-side">
        <div className="form-card">
          <div className="form-row">
            <label htmlFor="cover-file">Cover image · upload</label>
            <input
              id="cover-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={onUpload}
              disabled={uploading}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                padding: 8,
                background: "var(--bone)",
                cursor: uploading ? "wait" : "pointer",
              }}
            />
            <div className="hint">
              {uploading
                ? "Uploading…"
                : "JPG, PNG, WebP, GIF, AVIF · max 10 MB. Lands in your post-covers bucket."}
            </div>
            {uploadError && (
              <div className="form-msg err" style={{ marginTop: 8 }}>
                {uploadError}
              </div>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="cover">…or paste an image URL</label>
            <input
              id="cover" type="url"
              value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
            <div className="hint">Any HTTPS image URL works (uploads land here too).</div>
          </div>

          {coverImageUrl && (
            <div className="photo-plate wide" style={{ marginBottom: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImageUrl} alt="" />
            </div>
          )}

          <div className="form-row">
            <label htmlFor="rm">Read minutes</label>
            <input
              id="rm" type="number" min={1} max={120}
              value={readMinutes} onChange={(e) => setReadMinutes(e.target.value)}
              placeholder="7"
            />
          </div>

          <div className="form-row">
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", textTransform: "none", letterSpacing: 0, fontFamily: "var(--body)", fontSize: 15, color: "var(--ink)" }}>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              <span>Publish (visible on site)</span>
            </label>
            <div className="hint">Unpublished posts are visible only here in /admin.</div>
          </div>

          <button type="submit" className="form-submit" disabled={busy}>
            {busy ? "Saving…" : mode === "new" ? "File post" : "Save changes"}
          </button>
        </div>
      </aside>
    </form>
  );
}
