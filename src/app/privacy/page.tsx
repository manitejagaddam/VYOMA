import type { Metadata } from "next";
import { Legal } from "@/pages/Legal";
export const metadata: Metadata = { title: "Privacy Policy", description: "How VYOMA handles your data." };
export default function PrivacyPage() { return <Legal title="Privacy Policy" body="How VYOMA handles contact information and project inquiry data." />; }
