import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializamos Supabase con privilegios de administrador para bypass de RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const resend = new Resend(process.env.RESEND_API_KEY);

// =========================================================
// PALETA "MESA DE AUTOR" PARA CORREOS EXPLORAGO
// =========================================================
const primaryColor = '#1a1818'; 
const accentColor = '#1d54c3'; 
const bgSoft = '#f6f4f0'; 
const textDark = '#1a1818';
const textBase = '#4a4846'; 
const textMuted = '#8a8580';
const borderColor = '#e5e0d8';

function escapeHtml(value: unknown) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function emptyLabel(isEnglish: boolean, fallback?: string) {
  if (fallback) return escapeHtml(fallback);
  return isEnglish ? 'Not provided' : 'No proporcionado';
}

function getLogoHeader(subtitle: string) {
  return `
    <div style="background-color: ${primaryColor}; padding: 60px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 38px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; font-family: Arial, sans-serif;">
        EXPLORA<span style="color: ${accentColor};">GO.</span>
      </h1>
      <p style="color: ${accentColor}; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px; margin-top: 15px; font-family: 'Times New Roman', Times, serif; font-style: italic;">
        ${subtitle}
      </p>
    </div>
  `;
}

function getEmailShell(content: string, subtitle: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: ${textDark}; border: 1px solid ${borderColor}; overflow: hidden; background-color: #ffffff;">
      ${getLogoHeader(subtitle)}
      <div style="padding: 50px 40px; background-color: #ffffff;">
        ${content}
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type, customerName, email, phone, message, destination, locale, budget, startDate, travelers,
    } = body;

    if (type !== 'CONTACT' && type !== 'QUOTE') {
      return NextResponse.json({ error: 'Tipo de correo no soportado' }, { status: 400 });
    }

    const currentLocale = String(locale || 'es').toLowerCase();
    const isEnglish = currentLocale.startsWith('en');

    // 1. GUARDADO EN BASE DE DATOS (SERVER-SIDE)
    if (type === 'CONTACT') {
      const { error: dbError } = await supabase.from('contact_messages_expgo').insert([{ 
        full_name: customerName, email: email, phone: phone, message: message 
      }]);
      if (dbError) throw new Error(`Database Error: ${dbError.message}`);
    } else if (type === 'QUOTE') {
      const { error: dbError } = await supabase.from('custom_quotes_expgo').insert([{
        customer_name: customerName, customer_email: email, phone: phone, destination: destination,
        start_date: startDate, pax_qty: travelers, budget: budget, special_requests: message, status: 'pending'
      }]);
      if (dbError) throw new Error(`Database Error: ${dbError.message}`);
    }

    // 2. PREPARACIÓN DE CORREOS
    const safeName = escapeHtml(customerName);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : emptyLabel(isEnglish);
    const safeMessage = message ? escapeHtml(message) : (isEnglish ? 'No additional message.' : 'Sin mensaje adicional.');
    const safeDestination = destination ? escapeHtml(destination) : emptyLabel(isEnglish);
    const safeBudget = budget ? escapeHtml(budget) : emptyLabel(isEnglish);
    const safeStartDate = startDate ? escapeHtml(startDate) : emptyLabel(isEnglish);
    const safeTravelers = travelers ? escapeHtml(travelers) : emptyLabel(isEnglish);

    let subjectClient = '';
    let htmlClient = '';
    let subjectInternal = '';
    let htmlInternal = '';
    const greeting = isEnglish ? `Hello ${safeName},` : `Hola ${safeName},`;

    if (type === 'CONTACT') {
      subjectClient = isEnglish ? '[Explorago] We received your message' : '[Explorago] Tu solicitud ha sido recibida';
      subjectInternal = isEnglish ? `[NEW CONTACT MESSAGE] - ${safeName}` : `[NUEVA SOLICITUD DE CONTACTO] - ${safeName}`;
      const subtitle = isEnglish ? 'Curated Culinary Journeys' : 'Turismo Gastronómico de Alto Nivel';

      htmlClient = getEmailShell(`
          <h2 style="color: ${primaryColor}; margin-top: 0; font-size: 22px; font-weight: 800; text-transform: uppercase;">${greeting}</h2>
          <p style="font-size: 16px; line-height: 1.8; color: ${textBase};">
            ${isEnglish ? 'We have successfully received your message. Our culinary concierge team is reviewing your request and will contact you shortly.' : 'Hemos recibido tu mensaje con éxito. Nuestro equipo de concierge gastronómico está revisando tu solicitud y se pondrá en contacto contigo a la brevedad.'}
          </p>
          <div style="margin: 35px 0; padding: 28px; background-color: ${bgSoft}; border-left: 3px solid ${accentColor};">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: ${primaryColor}; margin-top: 0; margin-bottom: 15px;">${isEnglish ? 'Your message record' : 'Registro de tu mensaje'}</p>
            <p style="font-size: 15px; font-family: 'Times New Roman', Times, serif; font-style: italic; color: ${textBase}; margin: 0; line-height: 1.7;">"${safeMessage}"</p>
          </div>
        `, subtitle);

      htmlInternal = getEmailShell(`
          <h2 style="color: ${primaryColor}; margin-top: 0; font-size: 22px; font-weight: 800; text-transform: uppercase;">${isEnglish ? 'New Contact Message' : 'Nuevo Mensaje Web'}</h2>
          <p style="font-size: 15px; line-height: 1.8; color: ${textBase};">${isEnglish ? 'A new contact message was submitted.' : 'Se recibió un nuevo mensaje desde el sitio web.'}</p>
          <div style="padding: 28px; background-color: ${bgSoft}; border-left: 3px solid ${accentColor};">
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${safeName}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${safePhone}</p>
          </div>
          <div style="margin-top: 30px; padding: 24px; border: 1px solid ${borderColor};">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: ${primaryColor}; margin-top: 0;">${isEnglish ? 'Message' : 'Mensaje'}</p>
            <p style="font-size: 15px; font-family: 'Times New Roman', Times, serif; font-style: italic; color: ${textBase}; line-height: 1.7; margin-bottom: 0;">${safeMessage}</p>
          </div>
        `, isEnglish ? 'Internal notification' : 'Notificación interna');
    }

    if (type === 'QUOTE') {
      subjectClient = isEnglish ? `[Explorago] Designing your culinary journey to ${safeDestination}` : `[Explorago] Diseñando tu ruta culinaria a ${safeDestination}`;
      subjectInternal = isEnglish ? `[NEW ROUTE REQUEST] - ${safeDestination} - ${safeName}` : `[NUEVA RUTA A LA MEDIDA] - ${safeDestination} - ${safeName}`;
      const subtitle = isEnglish ? 'Tailor-made culinary design' : 'Diseño de rutas a la medida';

      htmlClient = getEmailShell(`
          <h2 style="color: ${primaryColor}; margin-top: 0; font-size: 22px; font-weight: 800; text-transform: uppercase;">${greeting}</h2>
          <p style="font-size: 16px; line-height: 1.8; color: ${textBase};">
            ${isEnglish ? `We have received your request for an immersive culinary journey to <strong>${safeDestination}</strong>. Our local experts are already crafting a proposal tailored to your palate.` : `Hemos recibido tu solicitud para una inmersión culinaria en <strong>${safeDestination}</strong>. Nuestro equipo de expertos locales ya está diseñando una propuesta adaptada a tu paladar.`}
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 35px 0;">
            <tbody>
              <tr style="border-bottom: 1px solid ${borderColor};"><td style="padding: 16px 0; font-size: 11px; font-weight: bold; color: ${textMuted}; text-transform: uppercase;">${isEnglish ? 'Destination' : 'Destino'}</td><td style="padding: 16px 0; font-size: 15px; color: ${accentColor}; text-align: right; font-weight: bold;">${safeDestination}</td></tr>
              <tr style="border-bottom: 1px solid ${borderColor};"><td style="padding: 16px 0; font-size: 11px; font-weight: bold; color: ${textMuted}; text-transform: uppercase;">${isEnglish ? 'Start date' : 'Fecha de inicio'}</td><td style="padding: 16px 0; font-size: 14px; color: ${textBase}; text-align: right;">${safeStartDate}</td></tr>
              <tr style="border-bottom: 1px solid ${borderColor};"><td style="padding: 16px 0; font-size: 11px; font-weight: bold; color: ${textMuted}; text-transform: uppercase;">${isEnglish ? 'Travelers' : 'Viajeros'}</td><td style="padding: 16px 0; font-size: 14px; color: ${textBase}; text-align: right;">${safeTravelers}</td></tr>
              <tr><td style="padding: 16px 0; font-size: 11px; font-weight: bold; color: ${textMuted}; text-transform: uppercase;">${isEnglish ? 'Budget' : 'Presupuesto'}</td><td style="padding: 16px 0; font-size: 14px; color: ${textBase}; text-align: right;">${safeBudget}</td></tr>
            </tbody>
          </table>
        `, subtitle);

      htmlInternal = getEmailShell(`
          <h2 style="color: ${primaryColor}; margin-top: 0; font-size: 22px; font-weight: 800; text-transform: uppercase;">${isEnglish ? 'New Route Request' : 'Nueva Solicitud de Ruta'}</h2>
          <div style="padding: 28px; background-color: ${bgSoft}; border-left: 3px solid ${accentColor};">
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Client:' : 'Cliente:'}</strong> ${safeName}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Destination:' : 'Destino:'}</strong> ${safeDestination}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Start date:' : 'Fecha:'}</strong> ${safeStartDate}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Travelers:' : 'Viajeros:'}</strong> ${safeTravelers}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Budget:' : 'Presupuesto:'}</strong> ${safeBudget}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 10px 0; font-size: 13px; color: ${textBase};"><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${safePhone}</p>
          </div>
          <div style="margin-top: 30px; padding: 24px; border: 1px solid ${borderColor};">
            <p style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: ${primaryColor}; margin-top: 0;">${isEnglish ? 'Special requests' : 'Requerimientos especiales'}</p>
            <p style="font-size: 15px; font-family: 'Times New Roman', Times, serif; font-style: italic; color: ${textBase}; line-height: 1.7; margin-bottom: 0;">${safeMessage}</p>
          </div>
        `, isEnglish ? 'Internal notification' : 'Notificación interna');
    }

    // 3. ENVÍO DE CORREOS
    const { error: clientError } = await resend.emails.send({
      from: 'Explorago Concierge <atencion@explorago.com.mx>',
      to: [email],
      subject: subjectClient,
      html: htmlClient,
    });

    if (clientError) throw new Error(`Resend Error: ${clientError.message}`);

    await resend.emails.send({
      from: 'Sistema Explorago <atencion@explorago.com.mx>',
      to: ['atencion@explorago.com.mx'],
      subject: subjectInternal,
      html: htmlInternal,
    });

    return NextResponse.json({ ok: true });

  } catch (error: unknown) {
    const errObj = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errObj }, { status: 500 });
  }
}