// app/api/anotar/route.js
//
// Este endpoint recibe la imagen ORIGINAL del examen + el resultado ya
// generado por /api/corregir (con las posiciones aproximadas de cada
// pregunta), y devuelve la misma imagen con marcas dibujadas encima, como
// si un profesor la hubiera corregido a mano con rotulador rojo.
//
// Si el plan es "gratis", se añade una marca de agua repetida con el
// nombre de AutoGradely sobre toda la imagen.

import sharp from 'sharp';

// Fuente incrustada directamente en el código, en vez de depender de un
// archivo aparte o de las fuentes que tenga instaladas el servidor.
// Esto es necesario porque los servidores de Vercel (y la mayoría de
// entornos "serverless") NO tienen fuentes del sistema instaladas, así que
// cualquier texto dibujado con una fuente normal aparecía en blanco o con
// cuadraditos en vez de las letras. Es una versión recortada de DejaVu Sans
// Bold que solo incluye los caracteres que realmente usamos (números,
// "." "/" y las letras de "AutoGradely"), por eso pesa solo unos pocos KB
// en vez de los ~700KB de la fuente completa.
const FUENTE_BASE64 = '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';

const definicionFuente = `
  <style>
    @font-face {
      font-family: 'AutoGradelyMarker';
      src: url(data:font/ttf;base64,${FUENTE_BASE64}) format('truetype');
    }
    text { font-family: 'AutoGradelyMarker'; }
  </style>`;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const archivo = formData.get('archivo');
    const resultadoTexto = formData.get('resultado'); // JSON en texto, lo parseamos abajo
    const plan = formData.get('plan') || 'gratis';

    if (!archivo || !resultadoTexto) {
      return Response.json(
        { error: 'Falta el archivo o el resultado de la corrección.' },
        { status: 400 }
      );
    }

    // Esta función solo sabe dibujar sobre imágenes, no sobre PDFs.
    if (!archivo.type?.startsWith('image/')) {
      return Response.json(
        { error: 'La versión anotada solo está disponible para fotos, no para PDF por ahora.' },
        { status: 400 }
      );
    }

    const resultado = JSON.parse(resultadoTexto);
    const archivoBuffer = Buffer.from(await archivo.arrayBuffer());

    // 1. Necesitamos saber el tamaño real de la imagen para convertir las
    // posiciones normalizadas (0-1000) que dio la IA a píxeles reales.
    const imagenBase = sharp(archivoBuffer);
    const metadata = await imagenBase.metadata();
    const ancho = metadata.width;
    const alto = metadata.height;

    // 2. Filtro de distorsión: hace que las líneas rectas de un SVG
    // parezcan trazadas a mano con un rotulador, en vez de líneas
    // perfectas de ordenador. Cada marca usa una "semilla" distinta para
    // que no todas se deformen exactamente igual (como a mano real).
    const filtroTrazoManual = (semilla) => `
      <filter id="trazo-${semilla}" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="${semilla}" result="ruido"/>
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="7"/>
      </filter>`;

    // 3. Antes de dibujar, calculamos la posición en píxeles de cada marca
    // y nos aseguramos de que no queden dos demasiado pegadas o superpuestas
    // (esto puede pasar si la IA estima posiciones muy parecidas para
    // preguntas distintas). Respetamos el orden en que vinieron las
    // preguntas —le pedimos en el prompt que ya vengan de arriba a abajo—
    // y empujamos hacia abajo cualquier marca que quede demasiado cerca
    // de la anterior.
    const separacionMinimaPx = Math.round(alto * 0.035); // ~3.5% del alto de la imagen
    let yAnteriorPx = -Infinity;
    const preguntasConPosicion = (resultado.preguntas || []).map((p) => {
      let yPx = Math.round(((p.posicion_y ?? 500) / 1000) * alto);
      if (yPx - yAnteriorPx < separacionMinimaPx) {
        yPx = yAnteriorPx + separacionMinimaPx;
      }
      yAnteriorPx = yPx;
      return { ...p, y_px: Math.min(yPx, alto - 20) }; // que no se salga por abajo
    });

    // 4. Construimos las marcas de corrección como elementos SVG, uno por
    // pregunta, colocados en el margen derecho a la altura ya calculada.
    // El grosor variable y el filtro de trazo dan sensación de rotulador real.
    const margenX = ancho - 60;
    let filtrosUsados = '';
    const marcasSvg = preguntasConPosicion
      .map((p, i) => {
        const y = p.y_px;
        const completa = p.puntos_obtenidos >= p.puntos_totales;
        const vacia = p.puntos_obtenidos === 0;
        const semilla = i + 1;
        filtrosUsados += filtroTrazoManual(semilla);
        // Pequeña rotación e inclinación aleatoria por marca, como haría una mano
        const inclinacion = (i % 2 === 0 ? 1 : -1) * (4 + (i % 3) * 2);

        if (completa) {
          // Marca de verificación (check), trazo grueso irregular tipo rotulador
          return `
            <g transform="translate(${margenX}, ${y}) rotate(${inclinacion})" filter="url(#trazo-${semilla})">
              <path d="M-2 9 L7 18 L24 -2" stroke="#C43E3E" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M-2 9 L7 18 L24 -2" stroke="#C43E3E" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
            </g>`;
        } else if (vacia) {
          // Aspa (X), también con trazo doble para dar textura de rotulador
          return `
            <g transform="translate(${margenX}, ${y}) rotate(${inclinacion})" filter="url(#trazo-${semilla})">
              <path d="M-2 -2 L20 20 M20 -2 L-2 20" stroke="#C43E3E" stroke-width="5.5" stroke-linecap="round"/>
              <path d="M-2 -2 L20 20 M20 -2 L-2 20" stroke="#C43E3E" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
            </g>`;
        } else {
          // Puntuación parcial: fracción de puntos, con la fuente incrustada
          // (ya no cursiva/Comic Sans, porque esas no existen en el
          // servidor; usamos nuestra fuente propia en negrita)
          return `
            <g transform="translate(${margenX - 16}, ${y}) rotate(${inclinacion * 0.5})" filter="url(#trazo-${semilla})">
              <text x="0" y="14" font-size="20" font-weight="bold" fill="#C43E3E">${p.puntos_obtenidos}/${p.puntos_totales}</text>
            </g>`;
        }
      })
      .join('');

    // 5. El sello de nota final, igual que el de la interfaz, pero
    // dibujado directamente sobre la imagen, arriba a la derecha, con el
    // mismo efecto de trazo irregular para que combine con las marcas.
    filtrosUsados += filtroTrazoManual('sello');
    const selloSvg = `
      <g transform="translate(${ancho - 130}, 30) rotate(-8)">
        <circle cx="50" cy="50" r="48" fill="white" fill-opacity="0.9" stroke="#C43E3E" stroke-width="3.5" stroke-dasharray="7,6" filter="url(#trazo-sello)"/>
        <text x="50" y="48" font-size="26" font-weight="bold" fill="#C43E3E" text-anchor="middle">${resultado.nota_total}</text>
        <text x="50" y="68" font-size="14" fill="#C43E3E" text-anchor="middle" opacity="0.8">/ ${resultado.nota_sobre}</text>
      </g>`;

    // 6. Marca de agua repetida solo para el plan gratuito.
    let marcaAguaSvg = '';
    if (plan !== 'pro') {
      const filas = [];
      const espacioY = 130;
      const espacioX = 200;
      for (let y = 0; y < alto + espacioY; y += espacioY) {
        for (let x = 0; x < ancho + espacioX; x += espacioX) {
          filas.push(
            `<text x="${x}" y="${y}" font-size="19" font-weight="bold" fill="#1B3A32" fill-opacity="0.28" transform="rotate(-25 ${x} ${y})">AutoGradely</text>`
          );
        }
      }
      marcaAguaSvg = filas.join('');
    }

    const overlaySvg = `
      <svg width="${ancho}" height="${alto}" xmlns="http://www.w3.org/2000/svg">
        ${definicionFuente}
        <defs>${filtrosUsados}</defs>
        ${marcasSvg}
        ${selloSvg}
        ${marcaAguaSvg}
      </svg>`;

    // 7. Componemos la imagen original + el SVG encima, y la exportamos.
    const imagenFinal = await imagenBase
      .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
      .png()
      .toBuffer();

    const base64 = imagenFinal.toString('base64');

    return Response.json({ imagen_base64: base64 }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/anotar:', error);
    return Response.json(
      { error: 'No se pudo generar el examen anotado.' },
      { status: 500 }
    );
  }
}
