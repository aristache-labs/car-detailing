import { DM_Sans } from 'next/font/google';

const contactBody = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-contact-body',
  display: 'swap',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${contactBody.variable} min-w-0`}>{children}</div>;
}
