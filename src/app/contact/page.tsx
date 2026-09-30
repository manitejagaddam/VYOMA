import type { Metadata } from "next";
import { Contact } from "@/pages/Contact";
export const metadata: Metadata = { title: "Start a Project", description: "Tell us what you need. VYOMA responds within one business day." };
export default function ContactPage() { return <Contact />; }
