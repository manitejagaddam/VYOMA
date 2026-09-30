import type { Metadata } from "next";
import { getPosts, getPostBySlug } from "@/lib/data";
import { InsightPost } from "@/pages/Insights";
import { notFound } from "next/navigation";
export async function generateStaticParams() { const p = await getPosts(); return p.map((x: any) => ({ slug: x.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const p = await getPostBySlug(slug); return p ? { title: p.title, description: p.excerpt } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = await getPostBySlug(slug); if (!p) notFound(); return <InsightPost post={p} />; }