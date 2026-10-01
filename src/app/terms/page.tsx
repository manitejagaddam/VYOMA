import type { Metadata } from "next";
import { Legal } from "@/views/Legal";
export const metadata: Metadata = { title: "Terms of Service", description: "The practical terms behind VYOMA project conversations and delivery." };

export default function TermsPage() {
  return (
    <Legal title="Terms of Service" dek="The practical terms that sit behind project conversations and delivery.">
      <h2>1. Introduction</h2>
      <p>Welcome to VYOMA. By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please do not use our website.</p>

      <h2>2. Use of Website</h2>
      <p>The content and services provided on this website are intended for informational purposes and for facilitating communication regarding potential software engineering, product design, and AI development projects. You may not use this website for any unlawful purpose.</p>

      <h2>3. Intellectual Property</h2>
      <p>All content, designs, text, graphics, and interfaces on this website are the intellectual property of VYOMA unless otherwise noted. Unauthorized use, reproduction, or distribution of any materials from this site is strictly prohibited.</p>

      <h2>4. Project Inquiries</h2>
      <p>Submitting an inquiry through our contact form does not create a binding contract for services. Any formal agreement for design, development, or consulting services will be established through a separate written contract executed by both parties.</p>

      <h2>5. Limitation of Liability</h2>
      <p>VYOMA is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or the inability to access our services.</p>

      <h2>6. Modifications</h2>
      <p>We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website following any changes constitutes acceptance of the new terms.</p>

      <h2>7. Contact Information</h2>
      <p>If you have any questions regarding these Terms of Service, please contact us at support@vyoma.world.</p>
    </Legal>
  );
}
