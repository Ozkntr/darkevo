import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiPage } from "@/components/wiki/WikiPage";
import { isWikiSlug, WIKI_SLUGS } from "@/lib/content";

export function generateStaticParams() {
  return WIKI_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isWikiSlug(slug)) return { title: "Wiki" };
  return { title: "Wiki" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isWikiSlug(slug)) notFound();
  return <WikiPage slug={slug} />;
}
