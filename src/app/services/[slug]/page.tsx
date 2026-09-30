import type { Metadata } from "next";
import { getServices, getServiceBySlug } from "@/lib/data";
import { ServiceDetail } from "@/pages/Services";
import { notFound } from "next/navigation";
export async function generateStaticParams() { const s = await getServices(); return s.map((x: any) => ({ slug: x.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const s = await getServiceBySlug(slug); return s ? { title: s.name, description: s.description } : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = await getServiceBySlug(slug); if (!s) notFound(); return <ServiceDetail service={s} />; }