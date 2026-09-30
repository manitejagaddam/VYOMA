import type { Metadata } from "next";
import { About } from "@/views/About";
export const metadata: Metadata = {
  title: "About VYOMA",
  description: "VYOMA is a multidisciplinary technology agency combining product design, engineering, and AI to build scalable digital products.",
};
export default function AboutPage() { return <About />; }
