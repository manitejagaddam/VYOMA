import type { Metadata } from "next";
import type { DataRow } from "@/lib/data";
import { getServices, getServiceBySlug } from "@/lib/data";
import { ServiceDetail } from "@/views/Services";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const s = await getServices();
  return s.map((x: DataRow) => ({ slug: x.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  return s
    ? { title: s.title as string, description: s.description as string, alternates: { canonical: `https://vyoma.world/services/${slug}` } }
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) notFound();
  return <ServiceDetail service={s} />;
}