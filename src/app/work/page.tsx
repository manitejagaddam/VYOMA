import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { Work } from "@/views/Work";
export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore VYOMA''s portfolio of custom software, web applications, and AI projects.",
};
export default async function WorkPage() {
  const projects = await getProjects();
  return <Work initialProjects={projects as any} />;
}
