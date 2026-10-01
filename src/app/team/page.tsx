import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data";
import { Team } from "@/views/Team";
export const metadata: Metadata = {
  title: "The Team",
  description: "Meet the designers, engineers, and AI specialists behind VYOMA.",
};
export default async function TeamPage() {
  const members = await getTeamMembers();
  return <Team initialMembers={members as Record<string, unknown>[]} />;
}
