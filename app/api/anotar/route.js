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
          // Puntuación parcial: fracción de puntos con trazo escrito a mano
          return `
            <g transform="translate(${margenX - 14}, ${y}) rotate(${inclinacion * 0.5})" filter="url(#trazo-${semilla})">
              <text x="0" y="14" font-family="'Segoe Script','Comic Sans MS',cursive" font-size="21" font-weight="bold" fill="#C43E3E">${p.puntos_obtenidos}/${p.puntos_totales}</text>
            </g>`;
        }
      })
      .join('');

    // 4. El sello de nota final, igual que el de la interfaz, pero
    // dibujado directamente sobre la imagen, arriba a la derecha, con el
    // mismo efecto de trazo irregular para que combine con las marcas.
    filtrosUsados += filtroTrazoManual('sello');
    const selloSvg = `
      <g transform="translate(${ancho - 130}, 30) rotate(-8)">
        <circle cx="50" cy="50" r="48" fill="white" fill-opacity="0.9" stroke="#C43E3E" stroke-width="3.5" stroke-dasharray="7,6" filter="url(#trazo-sello)"/>
        <text x="50" y="48" font-family="monospace" font-size="26" font-weight="bold" fill="#C43E3E" text-anchor="middle">${resultado.nota_total}</text>
        <text x="50" y="68" font-family="monospace" font-size="14" fill="#C43E3E" text-anchor="middle" opacity="0.8">/ ${resultado.nota_sobre}</text>
      </g>`;

    // 5. Marca de agua repetida solo para el plan gratuito.
    // Subida de opacidad respecto a la primera versión, que se perdía
    // demasiado entre el contenido del examen.
    let marcaAguaSvg = '';
    if (plan !== 'pro') {
      const filas = [];
      const espacioY = 130;
      const espacioX = 200;
      for (let y = 0; y < alto + espacioY; y += espacioY) {
        for (let x = 0; x < ancho + espacioX; x += espacioX) {
          filas.push(
            `<text x="${x}" y="${y}" font-family="sans-serif" font-size="19" font-weight="600" fill="#1B3A32" fill-opacity="0.28" transform="rotate(-25 ${x} ${y})">AutoGradely</text>`
          );
        }
      }
      marcaAguaSvg = filas.join('');
    }

    const overlaySvg = `
      <svg width="${ancho}" height="${alto}" xmlns="http://www.w3.org/2000/svg">
        <defs>${filtrosUsados}</defs>
        ${marcasSvg}
        ${selloSvg}
        ${marcaAguaSvg}
      </svg>`;

    // 5. Componemos la imagen original + el SVG encima, y la exportamos.
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
