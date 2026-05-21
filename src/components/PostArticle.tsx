import Link from "next/link";
import Markdown from "./Markdown";
import { formatBylineDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export default function PostArticle({
  post,
  backHref,
  backLabel,
  sectionLabel,
}: {
  post: Post;
  backHref: string;
  backLabel: string;
  sectionLabel: string;
}) {
  const fallback = `https://picsum.photos/seed/${post.slug}/1600/900`;
  return (
    <>
      <section className="post-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href={backHref}>← {backLabel}</Link>
          </div>
          {post.tag && (
            <div className="post-tag">
              {sectionLabel} · {post.tag}
              {post.read_minutes ? ` · ${post.read_minutes} min` : ""}
            </div>
          )}
          <h1>{post.title}</h1>
          {post.subtitle && <p className="subtitle">{post.subtitle}</p>}
          <div className="byline">
            {[post.byline, formatBylineDate(post.published_at)]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
      </section>

      <section className="post-cover">
        <div className="wrap">
          <div className="photo-plate cinema">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url || fallback} alt={post.title} />
          </div>
        </div>
      </section>

      <section className="post-body">
        <div className="wrap">
          <Markdown>{post.body || "_No body yet._"}</Markdown>
        </div>
      </section>

      <section className="post-foot">
        <div className="wrap">
          <Link href={backHref} className="btn">
            ← {backLabel}
          </Link>
        </div>
      </section>

      <style>{`
        .post-hero{ padding: 64px 0 36px; border-bottom: 1px solid var(--rule); }
        .post-hero .crumb{ margin-bottom: 32px; }
        .post-hero .crumb a{
          font-family: var(--mono); font-size: 11px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--rule); padding-bottom: 2px;
        }
        .post-hero .crumb a:hover{ color: var(--oxblood); border-color: var(--oxblood); }
        .post-hero .post-tag{
          font-family: var(--mono); font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
          color: var(--oxblood); margin-bottom: 18px;
        }
        .post-hero h1{
          margin: 0 0 18px;
          font-family: var(--display); font-weight: 400;
          font-size: clamp(42px, 6vw, 78px); line-height: .98; letter-spacing: -.015em;
          max-width: 22ch;
        }
        .post-hero .subtitle{
          margin: 0 0 18px; font-size: 21px; line-height: 1.4; color: var(--ink-soft);
          max-width: 44ch;
        }
        .post-hero .byline{
          font-family: var(--mono); font-size: 11px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--ink-mute);
        }
        .post-cover{ padding: 36px 0 0; }
        .post-cover .photo-plate{ aspect-ratio: 21/9; box-shadow: 10px 10px 0 var(--ink); }
        .post-body{ padding: 56px 0 80px; border-bottom: 1px solid var(--rule); }
        .post-body .wrap{ max-width: 760px; }
        .post-foot{ padding: 36px 0 80px; }
      `}</style>
    </>
  );
}
