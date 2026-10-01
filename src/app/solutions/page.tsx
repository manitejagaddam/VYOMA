import type { Metadata } from "next";
import { getSolutions } from "@/lib/data";
import { Solutions } from "@/views/Solutions";
export const metadata: Metadata = {
  title: "Solutions",
  description: "Pre-scoped digital products: custom CRMs, booking systems, AI assistants, and more.",
};
export default async function SolutionsPage() {
  const solutions = await getSolutions();
  return <Solutions initialSolutions={solutions as any} />;
}
