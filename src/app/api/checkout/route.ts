import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// Importamos la interfaz correcta para evitar usar 'any'
import { CartItem } from '@/lib/types'; 

const OCTANO_API_URL = 'https://pagos.octanopayments.com/api/v1';
const OCTANO_EMAIL = process.env.OCTANO_EMAIL || '';
const OCTANO_PASSWORD = process.env.OCTANO_PASSWORD || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      cartItems,
      totalAmount,
      customerInfo,
      cardData,
    } = body;

    if (!OCTANO_EMAIL || !OCTANO_PASSWORD) {
      throw new Error('Credenciales de OctanoPayments no configuradas en el servidor.');
    }

    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // PASO 1: Autenticación en Octano
    const authParams = new URLSearchParams();
    authParams.append('email', OCTANO_EMAIL);
    authParams.append('password', OCTANO_PASSWORD);

    const authRes = await fetch(`${OCTANO_API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: authParams.toString(),
    });

    const authData = await authRes.json();
    
    if (!authData.authToken) {
      console.error('Octano Auth Error:', authData);
      return NextResponse.json({ error: 'Fallo al autenticar con la pasarela de pago.' }, { status: 401 });
    }

    const authToken = authData.authToken;

    // PASO 2: Tokenización de Tarjeta
    const tokenizerPayload = {
      cardData: {
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
        cardholderName: cardData.cardName,
        expirationMonth: cardData.expMonth,
        expirationYear: cardData.expYear, 
      }
    };

    const tokenRes = await fetch(`${OCTANO_API_URL}/card/tokenizer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenizerPayload),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.cardNumberToken) {
      console.error('Octano Tokenizer Error:', tokenData);
      return NextResponse.json({ error: 'La tarjeta fue rechazada o es inválida.' }, { status: 400 });
    }

    const cardNumberToken = tokenData.cardNumberToken;
    const orderId = `EXP-${Date.now()}`; 

    // PASO 3: Procesar Venta
    // CORRECCIÓN TIPO: Usamos CartItem en lugar de any
    const octanoItems = cartItems.map((item: CartItem) => ({
      title: item.experience.title.substring(0, 50),
      amount: Number(item.pricePerPerson),
      quantity: Number(item.people),
      id: String(item.activityId),
    }));

    const salePayload = {
      amount: Number(totalAmount.toFixed(2)),
      currency: 484, 
      reference: String(orderId),
      customerInformation: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        middleName: '',
        email: customerInfo.email,
        phone1: customerInfo.phone,
        city: customerInfo.city || 'Ciudad de México',
        address1: customerInfo.address || 'Conocido',
        postalCode: customerInfo.postalCode || '00000',
        state: customerInfo.state || 'CDMX',
        country: 'Mx',
        ip: clientIp,
      },
      cardData: {
        cardNumberToken: cardNumberToken,
        cvv: cardData.cvc,
      },
      items: octanoItems,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://explorago.com.mx'}/checkout/procesando`, 
    };

    const saleRes = await fetch(`${OCTANO_API_URL}/sale`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salePayload),
    });

    const saleData = await saleRes.json();

    // PASO 4: Manejo de Respuesta
    if (saleData.status === 'APPROVED') {
      return NextResponse.json({ 
        ok: true, 
        result: 'success', 
        message: 'Pago procesado exitosamente',
        transactionId: saleData.transactionId,
        orderId: orderId
      });

    } else if (saleData.status === 'PENDING' && saleData.redirectTo) {
      return NextResponse.json({ 
        ok: true, 
        result: '3d_secure_required', 
        redirectUrl: saleData.redirectTo 
      });

    } else {
      console.warn('Pago declinado por Octano:', saleData);
      return NextResponse.json({ 
        error: saleData.message || 'El pago fue declinado por tu banco. Intenta con otra tarjeta.' 
      }, { status: 402 });
    }

  } catch (error: unknown) {
    console.error('Error general en checkout Octano:', error);
    return NextResponse.json({ error: 'Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.' }, { status: 500 });
  }
}