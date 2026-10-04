import type { Metadata } from "next";
import { getProjects, getServices, getSolutions, getTeamMembers, getPosts, getFaqs } from "@/lib/data";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "VYOMA — Custom Software, AI &amp; Product Design Agency",
  description: "VYOMA specializes in custom software development, AI solutions, and mobile app design for scalable digital products.",
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
