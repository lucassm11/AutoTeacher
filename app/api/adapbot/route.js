import { generateContentWithRotation } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json({ error: 'Cuerpo JSON invalido.' }, { status: 400 });
    }

    const { mensaje, historial = [], perfil, resultado, curso, materia, es_pro = false } = body;

    if (!mensaje?.trim()) {
      return Response.json({ error: 'El mensaje no puede estar vacio.' }, { status: 400 });
    }

    const systemPrompt = es_pro
      ? `Eres AdapBot, un asistente especializado en adaptaciones educativas y orientacion psicopedagogica.

CONTEXTO ACTUAL:
- Perfil del alumno: "${perfil || 'No especificado'}"
- Curso: "${curso || 'No especificado'}"
- Materia: "${materia || 'No especificada'}"
${resultado ? `- Resultado de la auditoria: Puntuacion ${resultado.puntuacion_accesibilidad || 0}/100 (${resultado.estado_cumplimiento || 'N/A'})` : ''}
${resultado?.dictamen_general ? `- Dictamen: ${resultado.dictamen_general.slice(0, 500)}` : ''}
${resultado?.examen_adaptado?.length ? `- Preguntas adaptadas: ${resultado.examen_adaptado.length}` : ''}

INSTRUCCIONES:
- Eres un experto en TDAH, dislexia, disgrafia, discalculia, TDL, TEL, DCD, TEA, altas capacidades, ansiedad y demas perfiles NEAE.
- Respondes en espanol, con un tono cercano pero profesional, como un orientador experimentado.
- Puedes explicar por que se aplicaron adaptaciones concretas, sugerir ajustes adicionales, resolver dudas sobre el perfil o la normativa DUA/LOMLOE/NEAE.
- REGLA DE RIGOR LEGAL: No utilices terminos como "sello oficial", "homologado por el Ministerio" o "validez automatica vinculante ante inspeccion". Adapto proporciona soporte tecnico y documental riguroso alineado con DUA y LOMLOE para que el profesor y el orientador lo presenten y fundamenten ante la CCP y la inspeccion, pero la aprobacion y validez legal corresponde siempre al equipo docente y centro educativo.
- Si te preguntan sobre algo fuera de tu ambito, indica amablemente que tu especialidad es la adaptacion educativa.
- Responde SIEMPRE con respuestas completas y bien desarrolladas. NUNCA cortes una respuesta a mitad.
- Puedes usar formato markdown ligero: negrita, listas cortas.`
      : `Eres AdapBot, un asistente especializado en adaptaciones educativas y orientacion psicopedagogica.

MODO GRATUITO: Solo puedes responder preguntas generales sobre adaptaciones educativas, el marco DUA y perfiles NEAE. NO tienes acceso al contexto del examen ni del perfil del alumno. Si el usuario pregunta por adaptaciones concretas de su examen, sugierele actualizar a Pro para obtener analisis personalizado.

INSTRUCCIONES:
- Eres un experto en TDAH, dislexia, disgrafia, discalculia, TDL, TEL, DCD, TEA, altas capacidades, ansiedad y demas perfiles NEAE.
- Respondes en espanol, con un tono cercano pero profesional.
- Responde preguntas generales sobre adaptaciones, directrices DUA y marco LOMLOE de atencion a la diversidad.
- REGLA DE RIGOR LEGAL: Recuerda que las adaptaciones son propuestas tecnicas para el aula y que la aprobacion oficial compete al centro educativo.
- Responde SIEMPRE con respuestas completas. NUNCA cortes una respuesta a mitad.`;

    const contents = [];
    for (const msg of historial) {
      contents.push({
        role: msg.rol === 'usuario' ? 'user' : 'model',
        parts: [{ text: msg.texto }],
      });
    }
    contents.push({ role: 'user', parts: [{ text: mensaje }] });

    const respuesta = await generateContentWithRotation({
      model: 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const texto = respuesta.text || 'Lo siento, no pude procesar tu pregunta. Intenta de nuevo.';

    return Response.json({ respuesta: texto }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/adapbot:', error);
    return Response.json(
      { error: 'Error al procesar: ' + (error.message || 'Error desconocido') },
      { status: 500 }
    );
  }
}
