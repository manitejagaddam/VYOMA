import type { Metadata } from "next";
import { Legal } from "@/views/Legal";
export const metadata: Metadata = { title: "Privacy Policy", description: "How VYOMA handles your data." };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy" dek="How VYOMA handles contact information and project inquiry data.">
      <h2>Information We Collect</h2>
      <p>When you contact VYOMA through our website, we collect your name, email address, and the details of your project inquiry. This information is used exclusively to respond to your request and evaluate potential collaborations.</p>
      
      <h2>How We Use Your Data</h2>
      <p>We use your contact information to communicate with you about your project. We do not sell, rent, or share your personal data with third parties for marketing purposes. Your data is stored securely in our database and is accessible only to authorized personnel.</p>
      
      <h2>Data Retention</h2>
      <p>We retain your inquiry data for as long as necessary to fulfill the purposes for which it was collected, or to comply with legal, regulatory, or internal policy requirements.</p>

      <h2>Your Rights</h2>
      <p>You have the right to request access to, correction, or deletion of your personal data. If you have any questions about this privacy policy or wish to exercise your rights, please contact us at support@vyoma.world.</p>
    </Legal>
  );
}
