export const SITE_CONTACT = {
  phoneDisplay: '+40 721 000 000',
  phoneHref: 'tel:+40721000000',
  whatsappHref: 'https://wa.me/40721000000',
  email: 'info@apexdetailing.ro',
  emailHref: 'mailto:info@apexdetailing.ro',
  area: 'Bucharest · Ilfov',
  addressLine: 'Str. Industriei 14',
  mapsHref: 'https://maps.google.com/?q=Str.+Industriei+14,+Bucharest',
  appointmentNote: 'By appointment only',
  hoursCompact: 'Mon–Fri · 09:00–19:00 · Sat · 09:00–16:00',
  studioHours: [
    { label: 'Mon – Fri', time: '09:00 – 19:00' },
    { label: 'Saturday', time: '09:00 – 16:00' },
    { label: 'Sunday', time: 'By appointment' },
  ],
} as const;
