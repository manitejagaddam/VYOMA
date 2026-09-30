import type { Metadata } from "next";
import { FAQ } from "@/pages/FAQ";
export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about working with VYOMA." };
export default function FAQPage() { return <FAQ />; }
