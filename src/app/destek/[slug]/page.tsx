import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPage } from "@/components/support/SupportPage";
import { isSupportSlug, SUPPORT_SLUGS } from "@/lib/content";

export function generateStaticParams() {
  return SUPPORT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSupportSlug(slug)) return { title: "Destek" };
  return { title: "Destek" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSupportSlug(slug)) notFound();
  return <SupportPage slug={slug} />;
}
