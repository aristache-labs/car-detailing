export type LeadRequest = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  condition?: string;
  preferredDate?: string;
  year?: string;
  message?: string;
  photoCount?: number;
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export function buildLeadRequest(formData: FormData): LeadRequest {
  const photoCount = formData
    .getAll('photos')
    .filter((entry) => entry instanceof File && entry.name && entry.size > 0).length;

  return {
    name: getText(formData, 'name'),
    phone: getText(formData, 'phone'),
    email: getText(formData, 'email'),
    vehicle: getText(formData, 'vehicle'),
    service: getText(formData, 'service'),
    condition: getText(formData, 'condition') || undefined,
    preferredDate: getText(formData, 'preferredDate') || undefined,
    year: getText(formData, 'year') || undefined,
    message: getText(formData, 'message') || undefined,
    photoCount: photoCount || undefined,
  };
}

export function buildLeadSummary(lead: LeadRequest) {
  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Vehicle: ${lead.vehicle}`,
    `Service: ${lead.service}`,
  ];

  if (lead.year) lines.push(`Vehicle year: ${lead.year}`);
  if (lead.condition) lines.push(`Condition: ${lead.condition}`);
  if (lead.preferredDate) lines.push(`Preferred date: ${lead.preferredDate}`);
  if (lead.message) lines.push(`Goals / notes: ${lead.message}`);
  if (lead.photoCount) {
    lines.push(`Photos selected on site: ${lead.photoCount} (please attach them in your message)`);
  }

  return lines.join('\n');
}

export function buildLeadMailtoHref(emailHref: string, lead: LeadRequest) {
  const email = emailHref.replace(/^mailto:/, '');
  const subject = `Quote request - ${lead.vehicle || 'vehicle detail'}`;
  const body = buildLeadSummary(lead);
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildLeadWhatsAppHref(whatsappHref: string, lead: LeadRequest) {
  const separator = whatsappHref.includes('?') ? '&' : '?';
  return `${whatsappHref}${separator}text=${encodeURIComponent(buildLeadSummary(lead))}`;
}
