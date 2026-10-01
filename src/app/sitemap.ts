import type { MetadataRoute } from "next";
import type { DataRow } from "@/lib/data";
import { getProjects, getServices, getSolutions, getPosts } from "@/lib/data";

const BASE = "https://vyoma.world";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                              priority: 1,   changeFrequency: "weekly"  },
    { url: `${BASE}/services`,               priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/solutions`,              priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/work`,                   priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/about`,                  priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/team`,                   priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/process`,                priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/technologies`,           priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/engagement-models`,      priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/insights`,               priority: 0.7, changeFrequency: "weekly"  },
    { url: `${BASE}/faq`,                    priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/contact`,                priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/privacy`,                priority: 0.3, changeFrequency: "yearly"  },
    { url: `${BASE}/terms`,                  priority: 0.3, changeFrequency: "yearly"  },
  ];

  const [projects, services, solutions, posts] = await Promise.all([
    getProjects(), getServices(), getSolutions(), getPosts(),
  ]);

  const dynamic: MetadataRoute.Sitemap = [
    ...projects.map((p: DataRow) => ({
      url: `${BASE}/work/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: p.updated_at ? new Date(p.updated_at as string) : undefined,
    })),
    ...services.map((s: DataRow) => ({
      url: `${BASE}/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: s.updated_at ? new Date(s.updated_at as string) : undefined,
    })),
    ...solutions.map((s: DataRow) => ({
      url: `${BASE}/solutions/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: s.updated_at ? new Date(s.updated_at as string) : undefined,
    })),
    ...posts.map((p: DataRow) => ({
      url: `${BASE}/insights/${p.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
      lastModified: p.updated_at ? new Date(p.updated_at as string) : undefined,
    })),
  ];

  return [...staticRoutes, ...dynamic];
}