import { generateContentWithRotation, Type } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json({ error: 'Cuerpo JSON invalido.' }, { status: 400 });
    }

    const { archivo_base64, mime_type, uid, es_pro } = body;

    if (!es_pro) {
      return Response.json({ error: 'Esta herramienta es exclusiva para cuentas Pro.' }, { status: 403 });
    }

    if (!uid) {
      return Response.json({ error: 'Debes iniciar sesion.' }, { status: 401 });
    }

    if (!archivo_base64) {
      return Response.json({ error: 'Debes subir un examen.' }, { status: 400 });
    }

    const systemPrompt = `ERES UN NEUROPSICOPEDAGOGO CLINICO CON 20 DE EXPERIENCIA EN DIAGNOSTICO EDUCATIVO.

Tu mision es ANALIZAR un examen respondido por un alumno e IDENTIFICAR posibles perfiles NEAE (Necesidades Especificas de Apoyo Educativo) basandote en los PATRONES DE RESPUESTA.

METODO DE ANALISIS — Examina cuidadosamente:

1. PATRONES DE ERROR:
   - Errores de descuido vs errores de concepto (TDAH)
   - Inversiones de letras/numeros (Dislexia, Disgrafia)
   - Dificultades con operaciones encadenadas (Discalculia)
   - Respuestas literalmente copiadas sin comprension (TEA)
   - Omisiones o saltos de preguntas (Atencion sostenida)
   - Inconsistencia entre preguntas faciles y dificiles (Fatiga cognitiva)

2. PATRONES DE ESCRITURA:
   - Tamaño irregular, margenes desiguales (Disgrafia / DCD)
   - Letras espejo o invertidas (Dislexia)
   - Letras flotantes o fuera de linea
   - Espaciado irregular entre palabras
   - Presion excesiva o insuficiente del lapiz

3. PATRONES DE COMPRENSION:
   - Respuestas literalmente copiadas del enunciado (TEA)
   - Dificultad con inferencias o implicito
   - Comprension literal vs figurada
   - Respuestas incompletas por agotamiento atencional

4. PATRONES TEMPORALES (si hay info):
   - Primeras preguntas bien, ultimas mal (Fatiga/TDAH)
   - Mismo tipo de error repetido (Patron especifico)
   - Deterioro progresivo del rendimiento

5. PATRONES EMOCIONALES:
   - Respuestas en blanco por bloqueo (Ansiedad)
   - Letra temblorosa o correcciones excesivas (Ansiedad)
   - Rendimiento inconsistente (Ansiedad situacional)

PERFILES NEAE CONOCIDOS:
- TDAH con deficit de atencion: errores de descuido, omisiones, fatiga cognitiva, primera parte mejor que la ultima
- TDAH hiperactivo-impulsivo: respuestas precipitadas, sin leer enunciado completo, errores por prisa
- TDAH combinado: mezcla de ambos patrones
- Dislexia: confusion b/d, p/q, errores ortograficos sistematicos, baja velocidad lectora
- Disgrafia: escritura ilegible, margenes irregulares, tamano inconsistente
- Discalculia: dificultad con calculo, confusion de operaciones, problemas con cantidad
- TDL/TEL: comprension literal, vocabulario simplificado, frases cortas
- DCD: coordination motriz afectada, escritura fatigosa, trazos inseguros
- TEA: respuestas literales, dificultad con implicito, rigidez
- Ansiedad: bloqueo, respuestas en blanco, rendimiento inconsistente
- Altas capacidades: respuestas avanzadas pero con errores de descuido

DEBES GENERAR un array de posibles diagnosticos ordenados por probabilidad (maximo 4), donde cada uno contenga:
- "perfil": nombre completo del perfil NEAE
- "slug": identificador para URL (ej: "tdah-atencion", "dislexia", "tea", etc.)
- "confianza": porcentaje del 1 al 99
- "explicacion_detallada": parrafo de 4-6 lineas explicando POR QUE este diagnostico, con datos concretos del examen analizado
- "patrones_detectados": array de objetos con { "patron": nombre del patron, "evidencia": evidencia concreta del examen, "frecuencia": "alta"|"media"|"baja" }
- "descartes": array de perfiles descartados con breve razon

IMPORTANTE:
- Nunca diagnostiques con certeza absoluta. Siempre indica que es una orientacion.
- Señala tambien perfiles que se descartan y por que.
- Analiza SOLO lo que se ve en el examen. No inventes info que no esta.
- Responde SIEMPRE en espanol.`;

    const contents = [{
      role: 'user',
      parts: [
        { text: 'Analiza este examen respondido y diagnostica los posibles perfiles NEAE del alumno segun sus patrones de respuesta. Muestra maximo 4 hipotesis ordenadas por probabilidad.' },
        { inlineData: { mimeType: mime_type || 'image/jpeg', data: archivo_base64 } },
      ],
    }];

    const respuesta = await generateContentWithRotation({
      model: 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosticos: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  perfil: { type: Type.STRING },
                  slug: { type: Type.STRING },
                  confianza: { type: Type.NUMBER },
                  explicacion_detallada: { type: Type.STRING },
                  patrones_detectados: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        patron: { type: Type.STRING },
                        evidencia: { type: Type.STRING },
                        frecuencia: { type: Type.STRING },
                      },
                      required: ['patron', 'evidencia', 'frecuencia'],
                    },
                  },
                  descartes: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        perfil: { type: Type.STRING },
                        razon: { type: Type.STRING },
                      },
                      required: ['perfil', 'razon'],
                    },
                  },
                },
                required: ['perfil', 'slug', 'confianza', 'explicacion_detallada', 'patrones_detectados', 'descartes'],
              },
            },
          },
          required: ['diagnosticos'],
        },
      },
    });

    const resultado = JSON.parse(respuesta.text || '{"diagnosticos":[]}');
    return Response.json(resultado, { status: 200 });
  } catch (error) {
    console.error('Error en /api/diagnosticar:', error);
    return Response.json(
      { error: 'Error al diagnosticar: ' + (error.message || 'Error desconocido') },
      { status: 500 }
    );
  }
}
