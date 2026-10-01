import type { Metadata } from "next";
import type { DataRow } from "@/lib/data";
import { getPosts, getPostBySlug } from "@/lib/data";
import { InsightPost } from "@/views/Insights";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const p = await getPosts();
  return p.map((x: DataRow) => ({ slug: x.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  return p
    ? { title: p.title as string, description: p.dek as string, alternates: { canonical: `https://vyoma.world/insights/${slug}` } }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) notFound();
  return <InsightPost post={p} />;
}