import type { Metadata } from "next";
import { getSolutions, getSolutionBySlug } from "@/lib/data";
import { SolutionDetail } from "@/pages/Solutions";
import { notFound } from "next/navigation";
export async function generateStaticParams() { const s = await getSolutions(); return s.map((x: any) => ({ slug: x.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const s = await getSolutionBySlug(slug); return s ? { title: s.name, description: s.description } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = await getSolutionBySlug(slug); if (!s) notFound(); return <SolutionDetail solution={s} />; }