import type { Metadata } from "next";
import { Legal } from "@/views/Legal";
export const metadata: Metadata = { title: "Terms of Service", description: "The practical terms behind VYOMA project conversations and delivery." };
export default function TermsPage() { return <Legal title="Terms of Service" body="The practical terms that sit behind project conversations and delivery." />; }
