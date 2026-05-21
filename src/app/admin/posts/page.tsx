import Link from "next/link";
import { listAllPosts } from "@/lib/db";
import { POST_KIND_LABEL } from "@/lib/types";
import { formatBylineDate } from "@/lib/format";
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await listAllPosts();

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>All <em>posts.</em></h1>
          <p className="lede">{posts.length} {posts.length === 1 ? "post" : "posts"} on file.</p>
        </div>
        <Link href="/admin/posts/new" className="btn solid">+ New post <span className="arr">→</span></Link>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "var(--ink-mute)" }}>Nothing yet. Compose your first post.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Title</th>
              <th>Kind</th>
              <th>Status</th>
              <th>Published</th>
              <th>Updated</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="title-cell">
                  <Link href={`/admin/posts/${p.id}`} style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--rule)" }}>
                    {p.title || <em style={{ color: "var(--ink-mute)" }}>untitled</em>}
                  </Link>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", marginTop: 4, letterSpacing: ".08em" }}>
                    /{p.kind === "field_note" ? "field" : "compass"}/{p.slug}
                  </div>
                </td>
                <td>{POST_KIND_LABEL[p.kind]}</td>
                <td>
                  <span className={`pill ${p.published ? "pub" : "draft"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>{p.published_at ? formatBylineDate(p.published_at) : <span style={{ color: "var(--ink-mute)" }}>—</span>}</td>
                <td>{formatBylineDate(p.updated_at)}</td>
                <td>
                  <div className="row-actions" style={{ justifyContent: "flex-end" }}>
                    <Link href={`/admin/posts/${p.id}`}>Edit</Link>
                    {p.published && (
                      <Link
                        href={`/${p.kind === "field_note" ? "field" : "compass"}/${p.slug}`}
                        target="_blank"
                      >
                        View
                      </Link>
                    )}
                    <DeletePostButton id={p.id} title={p.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
