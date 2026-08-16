// app/api/corregir/route.js
//
// Este endpoint recibe (desde el formulario del profesor):
//   - un archivo (imagen o PDF de la tarea/examen)
//   - el texto de la rúbrica
// Llama a Gemini con la misma lógica que ya validamos en test.js,
// y devuelve el resultado en JSON (nota + feedback por pregunta).

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// En Next.js App Router, exportamos una función con el nombre del método HTTP.
// POST porque el profesor nos está enviando datos (el archivo + la rúbrica).
export async function POST(request) {
  try {
    // 1. Leemos los datos que manda el formulario del navegador.
    // Como incluye un archivo, viene como "multipart/form-data",
    // por eso usamos formData() en vez de request.json().
    const formData = await request.formData();
    const archivo = formData.get('archivo'); // el File que subió el profesor
    const rubrica = formData.get('rubrica'); // el texto de la rúbrica

    // 2. Validación básica: si falta algo, devolvemos un error claro
    // en vez de dejar que falle más adelante de forma confusa.
    if (!archivo || !rubrica) {
      return Response.json(
        { error: 'Falta el archivo o la rúbrica en la petición.' },
        { status: 400 }
      );
    }

    // 3. Convertimos el archivo (que llega como objeto File/Blob) a base64,
    // que es el formato que espera la API de Gemini.
    const archivoBuffer = Buffer.from(await archivo.arrayBuffer());
    const archivoBase64 = archivoBuffer.toString('base64');

    // Detectamos el tipo de archivo a partir de su propio "type" (el navegador
    // ya nos lo da, no hace falta adivinarlo por la extensión como en test.js).
    const mimeType = archivo.type || 'image/jpeg';

    // 4. Construimos el mismo prompt que ya validamos en las pruebas.
    const prompt = `
Eres un profesor corrigiendo un examen. Te doy la rúbrica y una imagen/PDF del examen de un alumno.

RÚBRICA:
${rubrica}

INSTRUCCIONES:
- Corrige cada pregunta según la rúbrica exacta.
- Sé justo pero riguroso: no des puntos que no estén justificados por la rúbrica.
- Si el documento no corresponde a la rúbrica, indícalo claramente en el feedback_general y pon 0 en todo.
- Devuelve SOLO un JSON válido con este formato exacto, sin texto adicional antes ni después:

{
  "nota_total": 0,
  "nota_sobre": 10,
  "preguntas": [
    { "numero": 1, "puntos_obtenidos": 0, "puntos_totales": 0, "comentario": "" }
  ],
  "feedback_general": ""
}
`;

    // 5. Llamamos a Gemini, con el mismo reintento automático que ya
    // probamos en test.js por si el servidor está saturado (error 503).
    const maxIntentos = 3;
    let respuesta;
    for (let intento = 1; intento <= maxIntentos; intento++) {
      try {
        respuesta = await ai.models.generateContent({
          model: 'gemini-3.5-flash-lite', // nombre fijo (no alias) con 500 peticiones/día en el tier gratuito
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: archivoBase64 } },
              ],
            },
          ],
        });
        break;
      } catch (error) {
        const esSaturacion =
          error.message.includes('503') || error.message.includes('UNAVAILABLE');
        if (esSaturacion && intento < maxIntentos) {
          const espera = intento * 5;
          await new Promise((resolve) => setTimeout(resolve, espera * 1000));
        } else {
          throw error;
        }
      }
    }

    // 6. Limpiamos y convertimos la respuesta de texto a JSON real.
    const textoRespuesta = respuesta.text;
    const jsonLimpio = textoRespuesta.replace(/```json|```/g, '').trim();
    const resultado = JSON.parse(jsonLimpio);

    // 7. Devolvemos el resultado al navegador del profesor.
    return Response.json(resultado, { status: 200 });
  } catch (error) {
    console.error('Error en /api/corregir:', error);

    // Distinguimos el error 429 (límite de cuota gratuita superado) del resto,
    // porque el mensaje que le conviene ver al profesor es distinto: esto no es
    // un fallo del sistema, es que hemos usado ya las peticiones gratuitas
    // disponibles por ahora.
    const esLimiteCuota = error.status === 429 || error.message?.includes('429');

    if (esLimiteCuota) {
      return Response.json(
        {
          error:
            'Hemos alcanzado el límite de correcciones gratuitas por ahora. Espera unos minutos e inténtalo de nuevo.',
        },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'No se pudo procesar la corrección. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
