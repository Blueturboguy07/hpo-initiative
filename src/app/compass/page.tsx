import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { listPublishedPosts } from "@/lib/db";

export const revalidate = 60;

export default async function CompassIndex() {
  const posts = await listPublishedPosts("compass_interview", 60);

  return (
    <>
      <Masthead active="compass" />

      <section className="page-head">
        <div className="wrap">
          <div className="crumb reveal d1">§ IV · Clinical Compass</div>
          <h2 className="reveal d1">Conversations with <em>practitioners.</em></h2>
          <p className="reveal d2">Long-form interviews with clinicians, researchers, and public-health workers. Transcribed in full.</p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section style={{ padding: "120px 0", borderBottom: "1px solid var(--ink)" }}>
          <div className="wrap" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 48, color: "var(--ink-mute)", marginBottom: 12 }}>
              No interviews on file yet.
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: 16 }}>
              Editors — file a Compass interview at <Link href="/admin/posts/new" style={{ color: "var(--oxblood)" }}>/admin/posts/new</Link>.
            </p>
          </div>
        </section>
      ) : (
        <section className="interviews">
          <div className="wrap">
            <div className="section-head">
              <h3>The <em>archive</em></h3>
              <div className="meta">{posts.length} {posts.length === 1 ? "interview" : "interviews"} on file</div>
            </div>
            <div className="interviews-grid">
              {posts.map((p, i) => (
                <PostCard
                  key={p.id}
                  post={p}
                  basePath="/compass"
                  cornerLabel={`№ 0${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        .interviews{ padding:80px 0; border-bottom:1px solid var(--ink) }
        .interviews-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:36px 28px }
        .interviews-grid .card .photo-plate{ aspect-ratio:4/5 }
        @media (max-width:900px){ .interviews-grid{ grid-template-columns:1fr 1fr } }
        @media (max-width:600px){ .interviews-grid{ grid-template-columns:1fr } }
      `}</style>
    </>
  );
}
