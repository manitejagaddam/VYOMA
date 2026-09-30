import type { Metadata } from "next";
import { Process } from "@/pages/Process";
export const metadata: Metadata = { title: "Our Process", description: "How VYOMA works: from strategy and design through engineering, AI integration, and deployment." };
export default function ProcessPage() { return <Process />; }
