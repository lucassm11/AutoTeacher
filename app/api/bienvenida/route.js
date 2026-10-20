import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 're_build_placeholder');
}

export async function POST(request) {
  try {
    const resend = getResend();
    const { email, nombre } = await request.json();

    if (!email) {
      return Response.json({ error: 'Email requerido' }, { status: 400 });
    }

    const nombreLimpio = (nombre || 'Profesor/a').split(' ')[0];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const { data, error } = await resend.emails.send({
      from: 'Adapto <onboarding@resend.dev>',
      to: email,
      subject: `Bienvenido/a a Adapto, ${nombreLimpio}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:28px;font-weight:bold;color:#1B3A32;">adap<span style="color:#1B3A32;">to</span></span>
    </div>
    <div style="background:#fff;border-radius:12px;border:1px solid #e2e8f0;padding:32px;">
      <h1 style="margin:0 0 16px;font-size:20px;color:#1B3A32;">¡Hola, ${nombreLimpio}!</h1>
      <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6;">
        Tu cuenta ha sido creada correctamente. Ya puedes empezar a auditar exámenes contra el marco DUA / NEAE y LOMLOE.
      </p>
      <h3 style="font-size:14px;color:#1B3A32;margin:24px 0 8px;">Qué puedes hacer ya</h3>
      <ul style="font-size:13px;color:#475569;line-height:1.8;padding-left:20px;">
        <li>Auditar exámenes en imagen, PDF o texto</li>
        <li>Recibir el dictamen psicopedagógico completo</li>
        <li>Descargar el informe para tu expediente</li>
        <li>Obtener el examen adaptado pregunta por pregunta</li>
      </ul>
      <h3 style="font-size:14px;color:#1B3A32;margin:24px 0 8px;">Tu plan gratuito incluye</h3>
      <ul style="font-size:13px;color:#475569;line-height:1.8;padding-left:20px;">
        <li>3 auditorías DUA por sesión</li>
        <li>Acceso a 5 perfiles de alumno</li>
        <li>Informe con marca de agua</li>
      </ul>
      <div style="text-align:center;margin:28px 0;">
        <a href="${appUrl}/auditor-dua" style="display:inline-block;background:#1B3A32;color:#fff;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;">
          Auditar mi primer examen →
        </a>
      </div>
      <p style="font-size:12px;color:#94a3b8;text-align:center;margin:20px 0 0;">
        ¿Necesitas más? <a href="${appUrl}" style="color:#1B3A32;">Actualiza a Pro</a> para auditorías ilimitadas sin marca de agua.
      </p>
    </div>
    <p style="font-size:11px;color:#94a3b8;text-align:center;margin:24px 0 0;">
      Un saludo — El equipo de Adapto
    </p>
  </div>
</body>
</html>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message || 'Error enviando email' }, { status: 500 });
    }

    console.log(`Email enviado a ${email}, id: ${data?.id}`);
    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error('Error email bienvenida:', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
