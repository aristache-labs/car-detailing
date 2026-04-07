import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import {
  ALLOWED_PHOTO_TYPES,
  buildLeadRequest,
  buildLeadSubject,
  buildLeadSummary,
  MAX_PHOTO_COUNT,
  MAX_PHOTO_SIZE_BYTES,
  validateLeadRequest,
} from '@/lib/lead-intake';

function getInboxRoot() {
  return path.join(process.cwd(), '.data', 'lead-inbox');
}

async function saveLeadLocally(formData: FormData, leadId: string, summary: string) {
  const leadDir = path.join(getInboxRoot(), leadId);
  await mkdir(leadDir, { recursive: true });

  const photos = formData
    .getAll('photos')
    .filter(
      (entry): entry is File =>
        entry instanceof File && entry.name.length > 0 && entry.size > 0,
    );

  const savedPhotos: string[] = [];
  for (const photo of photos) {
    const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(leadDir, safeName);
    const bytes = Buffer.from(await photo.arrayBuffer());
    await writeFile(filePath, bytes);
    savedPhotos.push(safeName);
  }

  await writeFile(
    path.join(leadDir, 'submission.json'),
    JSON.stringify(
      {
        id: leadId,
        receivedAt: new Date().toISOString(),
        summary,
        photos: savedPhotos,
      },
      null,
      2,
    ),
    'utf8',
  );
}

async function sendViaResend(subject: string, summary: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_DESTINATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: summary,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend delivery failed: ${detail}`);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const lead = buildLeadRequest(formData);
    const validationError = validateLeadRequest(lead);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const photos = formData
      .getAll('photos')
      .filter(
        (entry): entry is File =>
          entry instanceof File && entry.name.length > 0 && entry.size > 0,
      );

    if (photos.length > MAX_PHOTO_COUNT) {
      return NextResponse.json({ error: `Please upload up to ${MAX_PHOTO_COUNT} photos.` }, { status: 400 });
    }

    for (const photo of photos) {
      if (photo.size > MAX_PHOTO_SIZE_BYTES) {
        return NextResponse.json(
          { error: `"${photo.name}" exceeds 8 MB. Please choose a smaller file.` },
          { status: 400 },
        );
      }

      if (photo.type && !ALLOWED_PHOTO_TYPES.some((allowedType) => allowedType === photo.type)) {
        return NextResponse.json(
          { error: `"${photo.name}" is not a supported image type. Use JPEG, PNG, WebP, or HEIC.` },
          { status: 400 },
        );
      }
    }

    const leadId = new Date().toISOString().replace(/[:.]/g, '-');
    const subject = buildLeadSubject(lead);
    const summary = `${buildLeadSummary(lead)}\nSubmission reference: ${leadId}`;

    let delivery = 'inbox';
    try {
      const sent = await sendViaResend(subject, summary);
      if (sent) {
        delivery = 'email';
      } else {
        await saveLeadLocally(formData, leadId, summary);
      }
    } catch (deliveryError) {
      console.error('Quote request delivery failed, falling back to local inbox.', deliveryError);
      await saveLeadLocally(formData, leadId, summary);
    }

    return NextResponse.json({
      ok: true,
      leadId,
      delivery,
      message:
        delivery === 'email'
          ? 'Your request was sent to the studio.'
          : 'Your request was received and stored in the studio inbox.',
    });
  } catch (error) {
    console.error('Quote request submission failed.', error);
    return NextResponse.json(
      {
        error:
          'We could not send your request right now. Please try again, or use the phone / WhatsApp options below.',
      },
      { status: 500 },
    );
  }
}
