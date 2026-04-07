import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';

export const metadata: Metadata = {
  title: 'Cookies Policy | Apex Detailing',
  description: 'How Apex Detailing uses cookies and local browser storage.',
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookies Policy"
      intro="This page explains how Apex Detailing uses basic browser storage tools, including cookies and similar technologies, to keep the site working as expected."
      sections={[
        {
          title: 'Essential usage',
          body: [
            'Some browser storage may be used to support core site behavior such as language preference, visual settings, and interface state.',
            'These helpers are used to keep the experience consistent between visits and do not change the services you can request from the studio.',
          ],
        },
        {
          title: 'Analytics and third parties',
          body: [
            'If third-party tools are added in the future for analytics, advertising, or embedded media, their storage behavior should be reviewed and updated in this policy.',
            'Links to services such as WhatsApp, Instagram, Facebook, TikTok, or YouTube may open platforms governed by their own cookie and privacy policies.',
          ],
        },
        {
          title: 'Managing preferences',
          body: [
            'You can control or remove cookies through your browser settings. Doing so may reset saved preferences such as language selection or site presentation choices.',
            'If you have questions about website storage behavior, contact the studio directly at info@apexdetailing.ro.',
          ],
        },
      ]}
    />
  );
}
