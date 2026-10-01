import type { Metadata } from "next";
import type { DataRow } from "@/lib/data";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { CaseStudy } from "@/views/CaseStudy";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const p = await getProjects();
  return p.map((x: DataRow) => ({ slug: x.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  return p
    ? { title: p.title as string, description: p.summary as string, alternates: { canonical: `https://vyoma.world/work/${slug}` } }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  return <CaseStudy project={p} />;
}