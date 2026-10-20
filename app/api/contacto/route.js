import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(request) {
  try {
    const { nombre, email, asunto, mensaje } = await request.json();

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje).replace(/\n/g, '<br/>');

    const asuntoLabels = {
      soporte: 'Soporte tecnico',
      facturacion: 'Facturacion',
      sugerencia: 'Sugerencia',
      centros: 'Centros educativos',
      otro: 'Otro',
    };

    await resend.emails.send({
      from: 'Adapto <onboarding@resend.dev>',
      to: 'hola@adapto.app',
      replyTo: email,
      subject: `[Adapto Contacto] ${asuntoLabels[asunto] || asunto} - ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #1B3A32; margin-bottom: 8px;">Nuevo mensaje de contacto</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p><strong>Nombre:</strong> ${safeNombre}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Asunto:</strong> ${asuntoLabels[asunto] || asunto}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #333; line-height: 1.6;">${safeMensaje}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Enviado desde el formulario de contacto de Adapto</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}
