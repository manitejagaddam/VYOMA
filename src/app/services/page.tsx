import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { Services } from "@/views/Services";
export const metadata: Metadata = {
  title: "Services",
  description: "Full-stack web development, mobile apps, AI engineering, product design, SaaS, and cloud infrastructure. One agency, end-to-end.",
};
export default async function ServicesPage() {
  const services = await getServices();
  return <Services initialServices={services as any} />;
}
