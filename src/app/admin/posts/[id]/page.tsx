import { notFound } from "next/navigation";
import PostEditor from "../PostEditor";
import { getPostById } from "@/lib/db";
import { POST_KIND_LABEL } from "@/lib/types";
import { formatBylineDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <>
      <h1>Edit <em>post.</em></h1>
      <p className="lede">
        {POST_KIND_LABEL[post.kind]} · last updated {formatBylineDate(post.updated_at)}
        {post.published ? " · published" : " · draft"}
      </p>
      <PostEditor mode="edit" post={post} />
    </>
  );
}
