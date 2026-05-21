import { notFound } from "next/navigation";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import PostArticle from "@/components/PostArticle";
import { getPublishedPostBySlug } from "@/lib/db";

export const revalidate = 60;

export default async function CompassPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post || post.kind !== "compass_interview") notFound();

  return (
    <>
      <Masthead active="compass" />
      <PostArticle
        post={post}
        backHref="/compass"
        backLabel="Back to Clinical Compass"
        sectionLabel="§ IV · Clinical Compass"
      />
      <Footer />
    </>
  );
}
