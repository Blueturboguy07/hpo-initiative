import Link from "next/link";
import { listAllPosts } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  const posts = await listAllPosts();
  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;

  const fieldNotes = posts.filter((p) => p.kind === "field_note").length;
  const interviews = posts.filter((p) => p.kind === "compass_interview").length;

  return (
    <>
      <h1>The <em>desk.</em></h1>
      <p className="lede">Welcome back, {user?.email}.</p>

      <div className="stat-grid">
        <Stat n={posts.length} label="Total posts" />
        <Stat n={published} label="Published" />
        <Stat n={drafts} label="Drafts" />
        <Stat n={fieldNotes} label="Field notes" />
        <Stat n={interviews} label="Compass interviews" />
      </div>

      <div className="action-grid">
        <Link href="/admin/posts/new" className="action">
          <div className="lbl">+ Compose</div>
          <div className="ttl">New post</div>
          <div className="desc">Field note or Clinical Compass interview.</div>
        </Link>
        <Link href="/admin/posts" className="action">
          <div className="lbl">Edit</div>
          <div className="ttl">All posts</div>
          <div className="desc">Browse, edit, publish, or unpublish.</div>
        </Link>
        <Link href="/admin/admins" className="action">
          <div className="lbl">Allowlist</div>
          <div className="ttl">Admins</div>
          <div className="desc">Add or remove editors who can sign in.</div>
        </Link>
      </div>

      <style>{`
        .stat-grid{
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 0;
          border-top: 3px double var(--ink); border-bottom: 1px solid var(--ink);
          margin: 36px 0 36px;
        }
        .stat-grid .s{ padding: 22px 18px; border-right: 1px solid var(--rule); }
        .stat-grid .s:last-child{ border-right: none; }
        .stat-grid .s .n{
          font-family: var(--display); font-style: italic; font-size: 56px; line-height: 1; color: var(--ink);
        }
        .stat-grid .s .l{
          font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--ink-mute); margin-top: 10px;
        }
        @media (max-width: 900px){ .stat-grid{ grid-template-columns: 1fr 1fr; } }

        .action-grid{
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 36px;
        }
        .action{
          display: block; padding: 28px; background: var(--bone-soft);
          border: 1px solid var(--ink); text-decoration: none; color: inherit;
          transition: transform .2s, box-shadow .2s;
        }
        .action:hover{ transform: translateY(-3px); box-shadow: 8px 8px 0 var(--oxblood); }
        .action .lbl{
          font-family: var(--mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
          color: var(--oxblood);
        }
        .action .ttl{
          font-family: var(--display); font-weight: 400; font-style: italic;
          font-size: 36px; line-height: 1; margin: 8px 0 10px;
        }
        .action .desc{ font-size: 14.5px; color: var(--ink-soft); line-height: 1.5; }
        @media (max-width: 900px){ .action-grid{ grid-template-columns: 1fr } }
      `}</style>
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="s">
      <div className="n">{n}</div>
      <div className="l">{label}</div>
    </div>
  );
}
