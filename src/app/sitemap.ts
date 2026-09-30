import { MetadataRoute } from "next";
import { getProjects, getServices, getSolutions, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://vyomatechnologies.com";
  const staticRoutes = [
    { url: base, priority: 1, changeFrequency: "weekly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/solutions`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/work`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/team`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/process`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/technologies`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/engagement-models`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/insights`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/faq`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const [projects, services, solutions, posts] = await Promise.all([
    getProjects(), getServices(), getSolutions(), getPosts()
  ]);

  const dynamic = [
    ...projects.map((p: any) => ({ url: `${base}/work/${p.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...services.map((s: any) => ({ url: `${base}/services/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...solutions.map((s: any) => ({ url: `${base}/solutions/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...posts.map((p: any) => ({ url: `${base}/insights/${p.slug}`, priority: 0.7, changeFrequency: "weekly" as const })),
  ];

  return [...staticRoutes, ...dynamic];
}