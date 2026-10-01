import type { Metadata } from "next";
import type { DataRow } from "@/lib/data";
import { getSolutions, getSolutionBySlug } from "@/lib/data";
import { SolutionDetail } from "@/views/Solutions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const s = await getSolutions();
  return s.map((x: DataRow) => ({ slug: x.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSolutionBySlug(slug);
  return s
    ? { title: s.title as string, description: s.description as string, alternates: { canonical: `https://vyoma.world/solutions/${slug}` } }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getSolutionBySlug(slug);
  if (!s) notFound();
  return <SolutionDetail solution={s} />;
}