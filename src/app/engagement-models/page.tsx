import type { Metadata } from "next";
import { Engagements } from "@/pages/Engagements";
export const metadata: Metadata = { title: "Engagement Models", description: "Flexible ways to work with VYOMA: project-based, retainer, or dedicated team." };
export default function EngagementsPage() { return <Engagements />; }
