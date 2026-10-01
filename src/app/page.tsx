import type { Metadata } from "next";
import { getProjects, getServices, getSolutions, getTeamMembers, getPosts, getFaqs } from "@/lib/data";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "VYOMA — Custom Software, AI & Product Design Agency",
  description: "VYOMA designs and builds scalable web apps, mobile products, and AI systems. Design, engineering, and intelligence — one connected team.",
};

export default async function HomePage() {
  const [projects, services, solutions, team, posts, faqs] = await Promise.all([
    getProjects(),
    getServices(),
    getSolutions(),
    getTeamMembers(),
    getPosts(),
    getFaqs()
  ]);

  return (
    <HomeClient 
      projects={projects} 
      services={services} 
      solutions={solutions} 
      team={team} 
      posts={posts} 
      faqs={faqs} 
    />
  );
}
