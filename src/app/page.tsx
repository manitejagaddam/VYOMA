// app/page.tsx — Home (SSG: statically generated at build)
import type { Metadata } from "next";
import { getProjects, getServices } from "@/lib/data";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "VYOMA — Custom Software, AI & Product Design Agency",
  description: "VYOMA designs and builds scalable web apps, mobile products, and AI systems. Design, engineering, and intelligence — one connected team.",
};

export default async function HomePage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  return <HomeClient projects={projects} services={services} />;
}
