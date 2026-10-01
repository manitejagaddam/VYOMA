import type { Metadata } from "next";
import { Suspense } from "react";
import { Contact } from "@/views/Contact";
export const metadata: Metadata = { title: "Start a Project", description: "Tell us what you need. VYOMA responds within one business day." };
export default function ContactPage() {
  return (
    <Suspense>
      <Contact />
    </Suspense>
  );
}
