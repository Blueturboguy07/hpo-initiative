import PostEditor from "../PostEditor";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <>
      <h1>New <em>post.</em></h1>
      <p className="lede">Markdown body, optional cover image, drafts by default. Toggle "Publish" when ready.</p>
      <PostEditor mode="new" />
    </>
  );
}
