import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { CartItem } from '@/lib/types';

// ============================================================================
// CONFIGURACIONES Y CREDENCIALES
// ============================================================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const OCTANO_EMAIL = process.env.OCTANO_EMAIL;
const OCTANO_PASSWORD = process.env.OCTANO_PASSWORD;
const OCTANO_API_URL = 'https://pagos.octanopayments.com/api/v1';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================================
// PALETA "MESA DE AUTOR" PARA CORREOS EXPLORAGO
// ============================================================================
const primaryColor = '#1a1818'; // Piedra Volcánica Oscura
const accentColor = '#1d54c3';  // Azul Añil / Cobalto
const bgSoft = '#f6f4f0';       // Lino Crudo / Crema

const formatPrice = (price: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Destructuración correcta del payload enviado por tu frontend
    const { 
      locale, 
      contactInfo, 
      billingInfo, 
      orderNotes, 
      cart, 
      cardInfo, // <-- AQUÍ ESTABA EL ERROR, AHORA COINCIDE CON EL FRONTEND
      formattedTotal, 
      manualFolioData
    } = body;

    if (!OCTANO_EMAIL || !OCTANO_PASSWORD) {
      throw new Error("Credenciales de OctanoPayments no configuradas en el servidor.");
    }

    const tempReferenceId = `REF-${Date.now()}`;
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // ============================================================================
    // 2. AUTENTICACIÓN EN OCTANO PAYMENTS
    // ============================================================================
    const authParams = new URLSearchParams();
    authParams.append('email', OCTANO_EMAIL);
    authParams.append('password', OCTANO_PASSWORD);

    const authRes = await fetch(`${OCTANO_API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: authParams.toString()
    });

    const authData = await authRes.json();
    if (!authData.authToken) {
      throw new Error("Credenciales de Octano incorrectas o bloqueadas.");
    }
    const authToken = authData.authToken;

    // ============================================================================
    // 3. TOKENIZACIÓN DE TARJETA (OCTANO)
    // ============================================================================
    const [expMonth, expYear] = cardInfo.expiry.split('/');
    
    const tokenizerPayload = {
      cardData: {
        cardNumber: cardInfo.number.replace(/\s/g, ''), // Eliminamos espacios
        cardholderName: cardInfo.name,
        expirationMonth: expMonth.trim(),
        expirationYear: expYear.trim(),
      }
    };

    const tokenRes = await fetch(`${OCTANO_API_URL}/card/tokenizer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenizerPayload)
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.cardNumberToken) {
      throw new Error("Tarjeta rechazada por el banco o encriptación fallida.");
    }
    const cardToken = tokenData.cardNumberToken;

    // ============================================================================
    // 4. PREPARAR ITEMS Y PROCESAR VENTA (OCTANO)
    // ============================================================================
    const octanoItems = manualFolioData 
      ? [{ title: `Pago Cotización: ${manualFolioData.folio}`, amount: manualFolioData.amount, quantity: 1, id: manualFolioData.folio }]
      : cart.items.map((item: CartItem) => ({
          title: item.experience.title.substring(0, 50),
          amount: Number(item.pricePerPerson),
          quantity: Number(item.people),
          id: String(item.activityId),
    }));

    const finalAmountToCharge = manualFolioData ? manualFolioData.amount : cart.total;

    const salePayload = {
      amount: Number(finalAmountToCharge.toFixed(2)),
      currency: 484, // MXN ISO numérico
      reference: tempReferenceId,
      customerInformation: {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName || 'Sin apellido',
        middleName: '',
        email: contactInfo.email,
        phone1: contactInfo.phone,
        city: billingInfo.localidad || 'Ciudad de México',
        address1: billingInfo.direccion || 'Sin Especificar',
        postalCode: billingInfo.codigo_postal || '00000',
        state: billingInfo.estado || 'CDMX',
        country: 'Mx', // Octano requiere 'Mx' en lugar de 'MX'
        ip: clientIp 
      },
      cardData: {
        cardNumberToken: cardToken,
        cvv: cardInfo.cvv
      },
      items: octanoItems,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://explorago.com.mx'}` 
    };

    const saleRes = await fetch(`${OCTANO_API_URL}/sale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salePayload)
    });
    
    const saleData = await saleRes.json();

    if (saleData.status !== 'APPROVED' && saleData.status !== 'PENDING') {
      console.error("❌ DETALLE DEL RECHAZO OCTANO:", saleData); 
      throw new Error(`Pago declinado: ${saleData.message || saleData.responseCode || 'Tarjeta rechazada por el banco'}`);
    }

    // ============================================================================
    // 5. GUARDAR EN SUPABASE
    // ============================================================================
    const { data: customer, error: custError } = await supabase
      .from('customers_expgo')
      .upsert({ 
        first_name: contactInfo.firstName, 
        last_name: contactInfo.lastName, 
        email: contactInfo.email, 
        phone: contactInfo.phone 
      }, { onConflict: 'email' })
      .select().single();

    if (custError) throw new Error("Error guardando cliente en la base de datos.");

    const { data: booking, error: bookError } = await supabase
      .from('bookings_expgo')
      .insert({
        customer_id: customer.id,
        session_id: manualFolioData ? manualFolioData.folio : null,
        total_amount: finalAmountToCharge,
        payment_status: 'paid',
        transaction_id: saleData.transactionId || saleData.authorizationNumber || tempReferenceId,
        payment_provider: 'octano', 
        payment_date: new Date().toISOString(),
        pais: billingInfo.pais,
        direccion: billingInfo.direccion,
        localidad: billingInfo.localidad,
        estado: billingInfo.estado,
        codigo_postal: billingInfo.codigo_postal,
        order_notes: orderNotes || null 
      })
      .select().single();

    if (bookError) throw new Error("Error guardando reserva en la base de datos.");

    if (cart.items.length > 0) {
      const validBookingItems = cart.items
        .filter((item: CartItem) => item.activityId > 0) 
        .map((item: CartItem) => ({
          booking_id: booking.id,
          activity_id: item.activityId,
          scheduled_date: item.date,
          pax_qty: item.people,
          unit_price: item.pricePerPerson,
          custom_destination: item.experience.plan_type === 'PERSONALIZADA' ? item.experience.destination : null
        }));

      if (validBookingItems.length > 0) {
        const { error: itemsError } = await supabase.from('booking_items_expgo').insert(validBookingItems);
        if (itemsError) throw new Error("Error guardando items de reserva en la BD.");
      }  
    }
   
    // ============================================================================
    // 6. CORREOS ELECTRÓNICOS (DISEÑO EDITORIAL EXPLORAGO)
    // ============================================================================
    const currentLocale = String(locale || 'es').toLowerCase();
    const isEnglish = currentLocale.startsWith('en');
    
    const subjectClient = isEnglish 
      ? `Booking Confirmation - Thank you for traveling with Explorago` 
      : `Confirmación de Reserva - Gracias por viajar con Explorago`;

    const greeting = isEnglish ? `Hello ${contactInfo.firstName},` : `Estimado/a ${contactInfo.firstName},`;
    const confirmationText = isEnglish 
      ? "Your dossier has been confirmed and your payment was successfully processed. A member of our concierge team will reach out to orchestrate the details." 
      : "Tu mesa está reservada y tu pago se procesó exitosamente. Un miembro de nuestro equipo se pondrá en contacto para afinar la logística.";
    
    const htmlClient = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #1a1818; border: 1px solid #e5e0d8; overflow: hidden; background-color: #ffffff;">
        
        <div style="background-color: ${primaryColor}; padding: 60px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 38px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
            EXPLORA<span style="color: ${accentColor};">GO.</span>
          </h1>
          <p style="color: ${accentColor}; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px; margin-top: 15px; font-family: 'Times New Roman', Times, serif; font-style: italic;">
            ${isEnglish ? 'Curated Culinary Journeys' : 'Turismo Gastronómico de Alto Nivel'}
          </p>
        </div>

        <div style="padding: 50px 40px; background-color: #ffffff;">
          <h2 style="color: ${primaryColor}; margin-top: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.5px;">
            ${greeting}
          </h2>
          <p style="font-size: 16px; line-height: 1.8; color: #4a4846;">${confirmationText}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; margin-top: 40px;">
            <thead>
              <tr style="border-bottom: 1px solid #e5e0d8; text-align: left;">
                <th style="padding: 12px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #8a8580;">${isEnglish ? "Experience" : "Experiencia"}</th>
                <th style="padding: 12px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #8a8580; text-align: center;">${isEnglish ? "Pax" : "Viajeros"}</th>
                <th style="padding: 12px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #8a8580; text-align: right;">${isEnglish ? "Price" : "Precio"}</th>
              </tr>
            </thead>
            <tbody>
              ${!manualFolioData ? cart.items.map((item: CartItem) => `
                <tr style="border-bottom: 1px solid ${bgSoft};">
                  <td style="padding: 24px 0;">
                    <p style="margin: 0; font-weight: bold; font-size: 16px; color: ${primaryColor};">${item.experience.title}</p>
                    <p style="margin: 8px 0 0; font-size: 13px; color: #8a8580; text-transform: uppercase; letter-spacing: 1px;">🗓 ${item.date} <br>✨ ${item.experience.plan_type}</p>
                  </td>
                  <td style="padding: 24px 0; text-align: center; vertical-align: top; font-weight: normal; color: #4a4846;">${item.people}</td>
                  <td style="padding: 24px 0; text-align: right; font-weight: bold; font-size: 15px; color: ${primaryColor}; vertical-align: top;">${formatPrice(item.totalPrice)}</td>
                </tr>
              `).join('') : `
                  <tr style="border-bottom: 1px solid ${bgSoft};">
                  <td style="padding: 24px 0;">
                    <p style="margin: 0; font-weight: bold; font-size: 16px; color: ${primaryColor};">${isEnglish ? "Custom Route Payment" : "Diseño de Ruta a la Medida"}</p>
                    <p style="margin: 8px 0 0; font-size: 13px; color: #8a8580; text-transform: uppercase; letter-spacing: 1px;">Folio: ${manualFolioData.folio}</p>
                  </td>
                  <td style="padding: 24px 0; text-align: center; vertical-align: top; font-weight: normal;">1</td>
                  <td style="padding: 24px 0; text-align: right; font-weight: bold; font-size: 15px; color: ${primaryColor}; vertical-align: top;">${formatPrice(manualFolioData.amount)}</td>
                </tr>
              `}
            </tbody>
          </table>

          <div style="padding: 20px 0; border-bottom: 1px solid #e5e0d8; margin-bottom: 40px; text-align: right;">
            <span style="font-size: 11px; font-weight: bold; color: #8a8580; text-transform: uppercase; letter-spacing: 2px;">
              ${isEnglish ? "Total Investment" : "Valor de Inversión"}
            </span>
            <span style="font-size: 32px; font-weight: normal; color: ${primaryColor}; display: block; margin-top: 8px; font-family: 'Times New Roman', Times, serif;">
              ${formattedTotal}
            </span>
          </div>

          <div style="padding: 30px; background-color: ${bgSoft}; border-left: 3px solid ${accentColor};">
            <h3 style="margin: 0 0 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: ${primaryColor};">
              ${isEnglish ? "Contact & Billing Details" : "Detalles de Contacto y Facturación"}
            </h3>
            <p style="margin: 10px 0; font-size: 13px; color: #4a4846;"><strong>Email:</strong> ${contactInfo.email}</p>
            <p style="margin: 10px 0; font-size: 13px; color: #4a4846;"><strong>${isEnglish ? "Phone:" : "Teléfono:"}</strong> ${contactInfo.phone}</p>
            <p style="margin: 10px 0; font-size: 13px; color: #4a4846;"><strong>${isEnglish ? "Address:" : "Dirección:"}</strong> ${billingInfo.direccion}, ${billingInfo.localidad}, ${billingInfo.estado}, ${billingInfo.codigo_postal}, ${billingInfo.pais}</p>
            ${orderNotes ? `<p style="margin: 15px 0 0; font-size: 13px; color: #4a4846; border-top: 1px solid #e5e0d8; padding-top: 15px; font-style: italic;"><strong>${isEnglish ? "Notes:" : "Indicaciones:"}</strong> ${orderNotes}</p>` : ''}
          </div>

        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Explorago Concierge <atencion@explorago.com.mx>', 
      to: [contactInfo.email], 
      subject: subjectClient,
      html: htmlClient,
    });

    // --- NOTIFICACIÓN INTERNA PARA EL EQUIPO ---
    const subjectInternal = `[NUEVA RESERVA] - ${formattedTotal} - ${contactInfo.firstName} ${contactInfo.lastName}`;
    
    const htmlInternal = `
      <div style="font-family: Arial, sans-serif; color: #1a1818;">
        <h2 style="color: ${primaryColor};">¡Nueva Mesa Reservada! (Vía Octano)</h2>
        <p>Se ha procesado un pago exitoso a través de la plataforma Explorago.</p>
        <hr style="border: 1px solid #e5e0d8;"/>
        <p><strong>Valor de Inversión:</strong> ${formattedTotal}</p>
        <p><strong>ID Transacción (Octano):</strong> ${saleData.transactionId || saleData.authorizationNumber}</p>
        <hr style="border: 1px solid #e5e0d8;"/>
        <h3>Datos del Viajero:</h3>
        <p><strong>Nombre:</strong> ${contactInfo.firstName} ${contactInfo.lastName}</p>
        <p><strong>Email:</strong> ${contactInfo.email}</p>
        <p><strong>Teléfono:</strong> ${contactInfo.phone}</p>
        <p><strong>Dirección:</strong> ${billingInfo.direccion}, ${billingInfo.localidad}, ${billingInfo.estado}, ${billingInfo.codigo_postal}</p>
        <p><strong>Indicaciones:</strong> ${orderNotes || 'Ninguna'}</p>
        <hr style="border: 1px solid #e5e0d8;"/>
        <h3>Ruta Seleccionada:</h3>
        <ul>
          ${!manualFolioData ? cart.items.map((item: CartItem) => `
            <li>${item.experience.title} (x${item.people} pax) - ${formatPrice(item.totalPrice)}</li>
          `).join('') : `<li>Diseño de Ruta a la Medida - Folio: ${manualFolioData.folio}</li>`}
        </ul>
      </div>
    `;

    await resend.emails.send({
      from: 'Sistema Explorago <atencion@explorago.com.mx>',
      to: ['atencion@explorago.com.mx'],
      subject: subjectInternal,
      html: htmlInternal,
    });

    return NextResponse.json({ 
      success: true, 
      bookingId: booking.id,
      // Si el banco requiere 3D secure (Validación extra por SMS)
      redirectUrl: saleData.status === 'PENDING' ? saleData.redirectTo : undefined
    });

  } catch (error: unknown) {
    console.error("Error capturado en Backend (Octano):", error);
    const errorMessage = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
  }
}