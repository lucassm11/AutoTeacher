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
    const rubrica = formData.get('rubrica'); // el texto de la rúbrica (puede venir vacío en Autopiloto)
    const modo = formData.get('modo') || 'rubrica'; // 'rubrica' (por defecto) o 'autopiloto'

    // 2. Validación básica: si falta algo, devolvemos un error claro
    // en vez de dejar que falle más adelante de forma confusa.
    // En modo Autopiloto no exigimos rúbrica, la IA la define ella misma.
    if (!archivo) {
      return Response.json({ error: 'Falta el archivo en la petición.' }, { status: 400 });
    }
    if (modo === 'rubrica' && !rubrica) {
      return Response.json({ error: 'Falta la rúbrica en la petición.' }, { status: 400 });
    }

    // 3. Convertimos el archivo (que llega como objeto File/Blob) a base64,
    // que es el formato que espera la API de Gemini.
    const archivoBuffer = Buffer.from(await archivo.arrayBuffer());
    const archivoBase64 = archivoBuffer.toString('base64');

    // Detectamos el tipo de archivo a partir de su propio "type" (el navegador
    // ya nos lo da, no hace falta adivinarlo por la extensión como en test.js).
    const mimeType = archivo.type || 'image/jpeg';

    // 4. Construimos el prompt según el modo elegido.
    const prompt =
      modo === 'autopiloto'
        ? `
Eres un profesor experto corrigiendo un examen o tarea. NO tienes una rúbrica
proporcionada por el profesor: tienes que deducir tú mismo, a partir del
contenido del documento, qué se está preguntando y cuál sería una corrección
justa y rigurosa, como la haría un profesor experimentado en esa materia.

INSTRUCCIONES:
- Primero, identifica de qué asignatura o tipo de examen se trata (por ejemplo: Lengua/idioma, Matemáticas, Ciencias Naturales, Historia, etc.) a partir del contenido, el enunciado y el tipo de preguntas. Indica esta asignatura detectada en el campo "asignatura_detectada".
- Adapta el rigor de corrección según la asignatura detectada:
  - Si es un examen de Lengua o de un idioma: penaliza también las faltas de ortografía, tildes y errores gramaticales en las respuestas escritas, no solo si la idea es correcta.
  - Si es un examen de Matemáticas: penaliza errores de cálculo y de procedimiento, aunque el resultado final sea correcto por casualidad, y valora positivamente un procedimiento correcto aunque el resultado final tenga un error de cálculo puntual.
  - Si es de Ciencias, Historia u otra asignatura de contenido: valora la precisión y completitud de la respuesta según el conocimiento esperado para el nivel del examen.
  - Si no puedes determinar la asignatura con claridad, aplica un criterio general de corrección justa y razonable.
- Identifica cada pregunta o ejercicio visible en el documento.
- Define tú mismo los criterios de puntuación de cada pregunta, de forma proporcional y razonable según su dificultad, hasta sumar 10 puntos en total.
- Corrige con rigor, igual que si tuvieras una rúbrica oficial delante.
- Explica en "criterios_aplicados" un resumen breve de qué criterios usaste para puntuar (incluyendo cómo influyó la asignatura detectada), para que el profesor pueda revisarlos antes de confirmar.
- Para cada pregunta, indica en "posicion_y" un número del 0 al 1000 que represente la posición vertical aproximada de esa respuesta dentro de la imagen (0 = arriba del todo, 1000 = abajo del todo). Es una estimación aproximada, no necesita ser exacta.
- Coloca las preguntas en el array "preguntas" en el mismo orden en que aparecen de arriba a abajo en la imagen, incluso si tu "posicion_y" estimado no es del todo preciso.
- IMPORTANTE — hazlo en dos partes:
  PARTE 1 (razonamiento libre): antes que nada, razona en texto normal, pregunta por pregunta, con calma y todo el detalle que necesites. Aquí puedes dudar, comprobar dos veces, corregirte a ti mismo si te equivocas — esta parte NO la va a ver el profesor, así que tómate tu tiempo para llegar a la conclusión correcta en cada pregunta.
  PARTE 2 (resultado final): cuando ya estés seguro de cada respuesta, escribe en una línea, exactamente y sin nada más, el texto "@@@RESULTADO@@@", y justo después el JSON final. Este JSON debe reflejar ÚNICAMENTE tus conclusiones ya verificadas de la Parte 1 — nunca incluyas ahí dudas, correcciones a medias, ni frases como "espera" o "revisando de nuevo". El JSON debe leerse como si lo hubiera escrito un profesor totalmente seguro de cada nota, y "puntos_obtenidos" debe coincidir siempre con la conclusión final a la que llegaste en la Parte 1.

Formato exacto del JSON de la Parte 2:
{
  "nota_total": 0,
  "nota_sobre": 10,
  "asignatura_detectada": "",
  "criterios_aplicados": "",
  "preguntas": [
    { "numero": 1, "puntos_obtenidos": 0, "puntos_totales": 0, "comentario": "", "posicion_y": 0 }
  ],
  "feedback_general": ""
}
`
        : `
Eres un profesor corrigiendo un examen. Te doy la rúbrica y una imagen/PDF del examen de un alumno.

RÚBRICA:
${rubrica}

INSTRUCCIONES:
- Corrige cada pregunta según la rúbrica exacta.
- Sé justo pero riguroso: no des puntos que no estén justificados por la rúbrica.
- Si el documento no corresponde a la rúbrica, indícalo claramente en el feedback_general y pon 0 en todo.
- Para cada pregunta, indica en "posicion_y" un número del 0 al 1000 que represente la posición vertical aproximada de esa respuesta dentro de la imagen (0 = arriba del todo, 1000 = abajo del todo). Es una estimación aproximada, no necesita ser exacta.
- Coloca las preguntas en el array "preguntas" en el mismo orden en que aparecen de arriba a abajo en la imagen, incluso si tu "posicion_y" estimado no es del todo preciso.
- IMPORTANTE — hazlo en dos partes:
  PARTE 1 (razonamiento libre): antes que nada, razona en texto normal, pregunta por pregunta, con calma y todo el detalle que necesites, comparando la respuesta del alumno con la rúbrica. Aquí puedes dudar, comprobar dos veces, corregirte a ti mismo si te equivocas — esta parte NO la va a ver el profesor.
  PARTE 2 (resultado final): cuando ya estés seguro de cada respuesta, escribe en una línea, exactamente y sin nada más, el texto "@@@RESULTADO@@@", y justo después el JSON final. Este JSON debe reflejar ÚNICAMENTE tus conclusiones ya verificadas de la Parte 1 — nunca incluyas ahí dudas, correcciones a medias, ni frases como "espera" o "revisando de nuevo". "puntos_obtenidos" debe coincidir siempre con la conclusión final a la que llegaste en la Parte 1.

Formato exacto del JSON de la Parte 2:
{
  "nota_total": 0,
  "nota_sobre": 10,
  "preguntas": [
    { "numero": 1, "puntos_obtenidos": 0, "puntos_totales": 0, "comentario": "", "posicion_y": 0 }
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

    // 6. La respuesta trae primero el razonamiento libre del modelo, y
    // después el marcador "@@@RESULTADO@@@" seguido del JSON final.
    // Descartamos todo lo anterior al marcador: es solo el "borrador
    // mental" del modelo, nunca debe llegar al profesor.
    const textoRespuesta = respuesta.text;
    const partes = textoRespuesta.split('@@@RESULTADO@@@');
    const textoJson = partes.length > 1 ? partes[partes.length - 1] : textoRespuesta;
    const jsonLimpio = textoJson.replace(/```json|```/g, '').trim();
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