import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { listPublishedPosts } from "@/lib/db";
import { formatBylineDate } from "@/lib/format";

export const revalidate = 60;

export default async function FieldIndex() {
  const posts = await listPublishedPosts("field_note", 60);
  const [lead, ...rest] = posts;

  return (
    <>
      <Masthead active="field" />

      <section className="page-head">
        <div className="wrap">
          <div className="crumb reveal d1">§ III · Field Notes</div>
          <h2 className="reveal d1">Notes from <em>the desk.</em></h2>
          <p className="reveal d2">Plain-English essays, explainers, and summaries — written for the patient holding the printout.</p>
        </div>
      </section>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {lead && <LeadArticle post={lead} />}
          {rest.length > 0 && (
            <section className="articles">
              <div className="wrap">
                <div className="section-head">
                  <h3>Recent <em>dispatches</em></h3>
                  <div className="meta">
                    {posts.length} {posts.length === 1 ? "note" : "notes"} in this issue
                  </div>
                </div>
                <div className="articles-grid">
                  {rest.map((p, i) => (
                    <PostCard
                      key={p.id}
                      post={p}
                      basePath="/field"
                      cornerLabel={`№ 0${i + 2}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
      <FieldStyles />
    </>
  );
}

function EmptyState() {
  return (
    <section style={{ padding: "120px 0", borderBottom: "1px solid var(--ink)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 48, color: "var(--ink-mute)", marginBottom: 12 }}>
          The next issue is in copy.
        </div>
        <p style={{ color: "var(--ink-soft)", fontSize: 16 }}>
          Editors — head to <Link href="/admin/posts/new" style={{ color: "var(--oxblood)" }}>/admin/posts/new</Link> to file the first note.
        </p>
      </div>
    </section>
  );
}

function LeadArticle({ post }: { post: { slug: string; title: string; tag: string | null; byline: string | null; excerpt: string | null; cover_image_url: string | null; published_at: string | null; read_minutes: number | null } }) {
  const fallback = `https://picsum.photos/seed/${post.slug}/1400/1120`;
  return (
    <section className="lead">
      <div className="wrap lead-grid">
        <div className="reveal d1">
          <div className="photo-plate wide">
            <span className="corner">Lead</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url || fallback} alt={post.title} />
          </div>
        </div>
        <div className="reveal d2">
          {post.tag && (
            <div className="tag">
              {post.tag}
              {post.read_minutes ? ` · ${post.read_minutes} min` : ""}
            </div>
          )}
          <h2><em>{post.title}</em></h2>
          <div className="byline">
            {[post.byline, formatBylineDate(post.published_at)].filter(Boolean).join(" · ")}
          </div>
          {post.excerpt && <p>{post.excerpt}</p>}
          <Link className="btn solid" href={`/field/${post.slug}`}>Read in full <span className="arr">→</span></Link>
        </div>
      </div>
    </section>
  );
}

function FieldStyles() {
  return (
    <style>{`
      .lead{ padding:64px 0; border-bottom:1px solid var(--ink) }
      .lead-grid{ display:grid; grid-template-columns:1.2fr 1fr; gap:48px; align-items:center }
      .lead .photo-plate.wide{ aspect-ratio:5/4; box-shadow:10px 10px 0 var(--ink) }
      .lead .tag{ font-family:var(--mono); font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--oxblood); margin-bottom:16px }
      .lead h2{ margin:0 0 18px; font-family:var(--display); font-weight:400; font-size:clamp(38px,5.2vw,68px); line-height:.98; letter-spacing:-.015em }
      .lead h2 em{ font-style:italic; color:var(--oxblood) }
      .lead .byline{ font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-mute); margin-bottom:18px }
      .lead p{ margin:0 0 22px; font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:50ch }
      @media (max-width:900px){ .lead-grid{ grid-template-columns:1fr } }

      .articles{ padding:60px 0 80px; border-bottom:1px solid var(--ink) }
      .articles-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:36px 28px }
      .articles-grid .card .photo-plate{ aspect-ratio:5/4 }
      @media (max-width:900px){ .articles-grid{ grid-template-columns:1fr 1fr } }
      @media (max-width:600px){ .articles-grid{ grid-template-columns:1fr } }
    `}</style>
  );
}
