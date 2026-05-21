import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin — The HPO Initiative" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <>
      <div className="admin-bar">
        <div className="wrap">
          <div className="nav-links">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/posts">Posts</Link>
            <Link href="/admin/posts/new">New post</Link>
            <Link href="/admin/admins">Admins</Link>
            <Link href="/" style={{ opacity: .65 }}>View site →</Link>
          </div>
          <div>
            <span className="who">{user.email}</span>{" "}
            <span style={{ opacity: .5, margin: "0 8px" }}>·</span>
            <Link href="/admin/logout">Sign out</Link>
          </div>
        </div>
      </div>
      <main className="admin-page">
        <div className="wrap">{children}</div>
      </main>
    </>
  );
}
