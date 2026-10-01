import type { Metadata } from "next";
import { Legal } from "@/views/Legal";
export const metadata: Metadata = { title: "Privacy Policy", description: "How VYOMA handles your data." };

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy Policy"
      dek="How VYOMA collects, uses, and protects the information you share with us."
    >
      <p><strong>Last updated:</strong> October 1, 2026</p>

      <p>
        This policy explains what personal data VYOMA (&quot;we&quot;, &quot;us&quot;) collects through
        this website, why we collect it, and the choices you have. By using the site or
        submitting an inquiry, you agree to the practices described here.
      </p>

      <h2>Information We Collect</h2>
      <p><strong>Information you give us.</strong> When you submit a contact or project inquiry form, we collect:</p>
      <ul>
        <li>Your name and email address</li>
        <li>Project details, budget, timeline, and anything else you choose to include</li>
      </ul>
      <p><strong>Information collected automatically.</strong> Like most websites, we may collect basic technical data such as IP address, browser type, device type, pages visited, and referring page. [Remove this if you don&apos;t use analytics or server logs.]</p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiry and discuss a potential collaboration</li>
        <li>To prepare proposals, quotes, and project communication</li>
        <li>To maintain the security and performance of our website</li>
        <li>To meet legal or regulatory obligations</li>
      </ul>
      <p>We do not sell or rent your personal data, and we do not use it for third-party marketing. We will only send you marketing emails if you have separately agreed to receive them.</p>

      <h2>Consent</h2>
      <p>We process the information you submit based on your consent, which you give by submitting the form. You can withdraw consent at any time by contacting us, though this will not affect processing already carried out.</p>

      <h2>Who We Share Data With</h2>
      <p>Your data is accessible only to authorized VYOMA team members. We use a limited set of trusted service providers to operate the site, such as [hosting provider], [database provider], and [email service]. They process data only on our behalf and under confidentiality obligations. We may also disclose information if required by law or to protect our legal rights.</p>

      <h2>Cookies and Analytics</h2>
      <p>[We use only essential cookies required for the site to function. / We use [analytics tool] to understand how visitors use the site. This data is aggregated and does not identify you personally.] You can control cookies through your browser settings.</p>

      <h2>Data Retention</h2>
      <p>
        We keep inquiry data for up to [24 months] after our last communication with you.
        If we begin working together, we retain project-related records for the duration of
        the engagement and for [X years] afterward for accounting and legal purposes. After
        that, your data is deleted or anonymized.
      </p>

      <h2>Data Security</h2>
      <p>We use reasonable technical and organizational safeguards, including encrypted connections (HTTPS) and access controls, to protect your data. No online system is completely secure, so we cannot guarantee absolute security, but we will act promptly if we become aware of a breach affecting your data.</p>

      <h2>Your Rights</h2>
      <p>Subject to applicable law (including India&apos;s Digital Personal Data Protection Act, 2023, and GDPR where relevant), you may:</p>
      <ul>
        <li>Request access to the personal data we hold about you</li>
        <li>Request correction of inaccurate or incomplete data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw your consent</li>
        <li>Raise a grievance about how we handle your data</li>
      </ul>
      <p>To exercise any of these rights, email <a href="mailto:vyoma1107@gmail.com">vyoma1107@gmail.com</a>. We aim to respond within [30] days.</p>

      <h2>Children&apos;s Privacy</h2>
      <p>Our services are intended for businesses and adults. We do not knowingly collect personal data from children under 18. If you believe a child has submitted data to us, contact us and we will delete it.</p>

      <h2>International Data Transfers</h2>
      <p>Our service providers may store or process data on servers outside your country. Where this happens, we take steps to ensure your data remains protected.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this policy from time to time. The &quot;Last updated&quot; date above shows when it last changed, and material changes will be reflected on this page.</p>

      <h2>Contact Us</h2>
      <p>
        Questions or requests about this policy? Reach us at{" "}
        <a href="mailto:vyoma1107@gmail.com">vyoma1107@gmail.com</a>.
        [Add registered business name and address if applicable.]
      </p>
    </Legal>
  );
}