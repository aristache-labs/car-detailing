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

export const CURRENT_YEAR = new Date().getFullYear();
export const MAX_PHOTO_COUNT = 3;
export const MAX_PHOTO_SIZE_MB = 8;
export const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * 1024 * 1024;
export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as const;

/** Maximum character lengths for each field — keeps mailto URIs well under browser limits */
const FIELD_LIMITS: Record<string, number> = {
  name: 120,
  phone: 30,
  email: 254,
  vehicle: 120,
  service: 80,
  condition: 80,
  preferredDate: 20,
  year: 4,
  message: 800,
};

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  const limit = FIELD_LIMITS[key];
  return limit ? trimmed.slice(0, limit) : trimmed;
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

export function validateLeadRequest(lead: LeadRequest) {
  if (!lead.name || !lead.phone || !lead.email || !lead.vehicle || !lead.service) {
    return 'Please complete all required fields before sending your request.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return 'Please enter a valid email address.';
  }

  if (lead.year) {
    const year = Number(lead.year);
    if (!Number.isInteger(year) || year < 1980 || year > CURRENT_YEAR + 1) {
      return `Vehicle year must be between 1980 and ${CURRENT_YEAR + 1}.`;
    }
  }

  if (lead.photoCount && lead.photoCount > MAX_PHOTO_COUNT) {
    return `Please upload up to ${MAX_PHOTO_COUNT} photos.`;
  }

  return null;
}

/**
 * Maximum safe mailto body length. Most desktop email clients handle ~2000 chars
 * in the URI; we leave headroom for subject, encoding overhead, and long field values.
 */
const MAILTO_BODY_LIMIT = 1600;

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

export function buildLeadSubject(lead: LeadRequest) {
  return `Quote request - ${lead.vehicle || 'vehicle detail'}`;
}

export function buildLeadMailtoHref(emailHref: string, lead: LeadRequest) {
  const email = emailHref.replace(/^mailto:/, '');
  const subject = buildLeadSubject(lead);
  const body = buildLeadSummary(lead).slice(0, MAILTO_BODY_LIMIT);
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildLeadWhatsAppHref(whatsappHref: string, lead: LeadRequest) {
  const separator = whatsappHref.includes('?') ? '&' : '?';
  return `${whatsappHref}${separator}text=${encodeURIComponent(buildLeadSummary(lead))}`;
}
