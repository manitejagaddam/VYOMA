import type { Metadata } from "next";
import { FAQ } from "@/views/FAQ";
import { getFaqs } from "@/lib/data";
export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about working with VYOMA." };
export default async function FAQPage() { 
  const faqs = await getFaqs();
  return <FAQ initialFaqs={faqs} />; 
}
