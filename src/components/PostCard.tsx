import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatBylineDate } from "@/lib/format";

type Props = {
  post: Post;
  basePath: "/field" | "/compass";
  cornerLabel?: string;
};

export default function PostCard({ post, basePath, cornerLabel }: Props) {
  const href = `${basePath}/${post.slug}`;
  const fallback = `https://picsum.photos/seed/${post.slug}/900/720`;
  return (
    <Link href={href} className="card">
      <div className="photo-plate">
        {cornerLabel && <span className="corner">{cornerLabel}</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover_image_url || fallback}
          alt={post.title}
        />
      </div>
      {post.tag && (
        <div className="tag">
          {post.tag}
          {post.read_minutes ? ` · ${post.read_minutes} min` : ""}
        </div>
      )}
      <h4>{post.title}</h4>
      {post.excerpt && <p>{post.excerpt}</p>}
      <div className="byline">
        {[post.byline, formatBylineDate(post.published_at)]
          .filter(Boolean)
          .join(" · ")}
      </div>
    </Link>
  );
}
