import type { Metadata } from "next";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { CaseStudy } from "@/views/CaseStudy";
import { notFound } from "next/navigation";
export async function generateStaticParams() { const p = await getProjects(); return p.map((x: any) => ({ slug: x.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = await getProjectBySlug(slug); return p ? { title: p.name, description: p.summary } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = await getProjectBySlug(slug); if (!p) notFound(); return <CaseStudy project={p} />; }