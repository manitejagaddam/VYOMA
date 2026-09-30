import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import { Insights } from "@/pages/Insights";
export const metadata: Metadata = { title: "Insights", description: "Articles on software engineering, product design, AI, and building digital products that last." };
export default async function InsightsPage() {
  const posts = await getPosts();
  return <Insights initialPosts={posts} />;
}
