import type { Metadata } from "next";
import { Technologies } from "@/views/Technologies";
export const metadata: Metadata = { title: "Technologies", description: "The technology stack powering VYOMA: React, Node.js, Python, cloud, and leading AI frameworks." };
export default function TechnologiesPage() { return <Technologies />; }
