import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import PostArticle from "@/components/PostArticle";
import { getPublishedPostBySlug } from "@/lib/db";

export const revalidate = 60;

export default async function FieldPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post || post.kind !== "field_note") notFound();

  return (
    <>
      <Masthead active="field" />
      <PostArticle
        post={post}
        backHref="/field"
        backLabel="Back to Field Notes"
        sectionLabel="§ III · Field Notes"
      />
      <Footer />
    </>
  );
}
