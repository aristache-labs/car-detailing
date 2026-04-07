import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Apex Detailing',
  description: 'How Apex Detailing handles inquiry and website contact information.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This page explains what information Apex Detailing collects through the website and how it is used when you request a quote, call the studio, or send a message."
      sections={[
        {
          title: 'Information we receive',
          body: [
            'We receive the details you choose to share with us, such as your name, phone number, email address, vehicle information, service interest, and message content.',
            'If you choose to contact us by email or WhatsApp, that communication is also handled by those services under their own terms and privacy policies.',
          ],
        },
        {
          title: 'How we use it',
          body: [
            'We use inquiry details to reply to your request, prepare an estimate, schedule inspections, and provide follow-up service communication.',
            'We do not use contact requests for unrelated marketing blasts, and we do not sell inquiry information to third parties.',
          ],
        },
        {
          title: 'Retention and questions',
          body: [
            'We keep inquiry information only for as long as it is needed to respond, quote, schedule, or support an active client relationship.',
            'If you would like us to correct or remove information you sent through the website, contact the studio directly at info@apexdetailing.ro.',
          ],
        },
      ]}
    />
  );
}
