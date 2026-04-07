import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Apex Detailing',
  description: 'General website and inquiry terms for Apex Detailing.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms apply to the public website and to quote requests submitted through Apex Detailing contact channels."
      sections={[
        {
          title: 'Website use',
          body: [
            'Website content is provided for general information about services, pricing starting points, and studio availability. Final recommendations and quotes are confirmed after inspection.',
            'You may browse, contact the studio, and request a quote through the website, but published information does not create a binding service agreement on its own.',
          ],
        },
        {
          title: 'Quotes and scheduling',
          body: [
            'Quotes shown on the site are starting points unless a written custom recommendation is issued by the studio.',
            'Appointments, timelines, and service scope are confirmed directly with the client after review of the vehicle condition, requested services, and inspection findings.',
          ],
        },
        {
          title: 'Service communication',
          body: [
            'By contacting the studio, you agree that Apex Detailing may reply by phone, email, or WhatsApp to discuss your request and schedule service.',
            'If you need clarification about any quote, recommendation, or booking detail, please contact the studio before confirming the work.',
          ],
        },
      ]}
    />
  );
}
