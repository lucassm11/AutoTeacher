// lib/gemini.js
import { GoogleGenAI, Type } from '@google/genai';

/**
 * Obtiene la lista ordenada de claves disponibles desde las variables de entorno:
 * - GEMINI_API_KEYS (lista separada por comas)
 * - GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.
 * - GEMINI_API_KEY (clave principal o fallback)
 */
export function getGeminiKeys() {
  const envKeys = [];

  // 1. Comprobar GEMINI_API_KEYS (separadas por comas)
  if (process.env.GEMINI_API_KEYS) {
    const split = process.env.GEMINI_API_KEYS.split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    if (split.length > 0) envKeys.push(...split);
  }

  // 2. Comprobar GEMINI_API_KEY_1..10 individuales
  for (let i = 1; i <= 10; i++) {
    const k = process.env[`GEMINI_API_KEY_${i}`];
    if (k && k.trim() && !envKeys.includes(k.trim())) {
      envKeys.push(k.trim());
    }
  }

  // 3. Comprobar GEMINI_API_KEY simple
  if (process.env.GEMINI_API_KEY && !envKeys.includes(process.env.GEMINI_API_KEY.trim())) {
    envKeys.unshift(process.env.GEMINI_API_KEY.trim());
  }

  if (envKeys.length === 0) {
    throw new Error('No se ha configurado ninguna clave de API de Gemini en GEMINI_API_KEYS o GEMINI_API_KEY.');
  }

  return envKeys;
}

// Índice actual de la clave activa en memoria para rotación continua
let activeKeyIndex = 0;

/**
 * Obtiene el índice de la clave activa actual
 */
export function getActiveKeyIndex() {
  return activeKeyIndex;
}

/**
 * Crea una instancia de GoogleGenAI para una clave concreta o la activa actual
 */
export function getAI(apiKey) {
  const keys = getGeminiKeys();
  const key = apiKey || keys[activeKeyIndex % keys.length];
  return new GoogleGenAI({ apiKey: key });
}

/**
 * Determina si un error devuelto por la API de Gemini es susceptible de rotación:
 * - 429: Cuota agotada / Rate limit
 * - 503 / 500 / 502 / 504: Modelo sobresaturado / High demand / Servicio no disponible
 * - 403: Permisos o clave suspendida / expirada
 */
export function isRetriableGeminiError(error) {
  if (!error) return false;

  const status = error.status || error.statusCode || error.code;
  const msg = (error.message || '').toLowerCase();
  const statusStr = String(status || '');

  // 1. Detección de cuota o saturación por código HTTP
  if (status === 429 || status === 503 || status === 500 || status === 502 || status === 504 || status === 403) {
    return true;
  }

  // 2. Detección por texto de error típico de Google GenAI
  if (
    msg.includes('high demand') ||
    msg.includes('unavailable') ||
    msg.includes('overloaded') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('resource_exhausted') ||
    msg.includes('resourceexhausted') ||
    msg.includes('too many requests') ||
    msg.includes('spikes in demand') ||
    msg.includes('service unavailable') ||
    msg.includes('temporarily') ||
    statusStr.includes('503') ||
    statusStr.includes('429')
  ) {
    return true;
  }

  return false;
}

/**
 * Ejecuta una operación contra Gemini con rotación automática de claves.
 * Si una clave se queda sin cuota (429) o el modelo está sobresaturado (503),
 * rota automáticamente a la siguiente clave y reintenta la petición.
 */
export async function callWithKeyRotation(operationFn) {
  const keys = getGeminiKeys();
  const totalKeys = keys.length;
  let attempts = 0;
  let lastError = null;

  while (attempts < totalKeys) {
    const keyIndex = activeKeyIndex % totalKeys;
    const currentKey = keys[keyIndex];
    const maskedKey = `${currentKey.slice(0, 8)}...${currentKey.slice(-6)}`;
    const ai = new GoogleGenAI({ apiKey: currentKey });

    try {
      // Ejecutar la llamada con la clave activa
      const result = await operationFn(ai, currentKey, keyIndex);
      return result;
    } catch (error) {
      lastError = error;
      const isRetriable = isRetriableGeminiError(error);

      console.warn(
        `[GeminiRotation] Clave #${keyIndex + 1} (${maskedKey}) falló ` +
        `[${error.status || error.code || 'ERR'}]: ${error.message || 'Error desconocido'}.`
      );

      if (isRetriable) {
        // Rotar al siguiente índice
        activeKeyIndex = (activeKeyIndex + 1) % totalKeys;
        const nextKeyIndex = activeKeyIndex;
        const nextMasked = `${keys[nextKeyIndex].slice(0, 8)}...${keys[nextKeyIndex].slice(-6)}`;
        
        console.warn(
          `[GeminiRotation] Detectada cuota agotada o saturación del modelo. ` +
          `Rotando automáticamente a Clave #${nextKeyIndex + 1} (${nextMasked}) (Intento ${attempts + 1}/${totalKeys})...`
        );

        attempts++;
        // Pequeña pausa de 200ms antes del siguiente reintento
        await new Promise((resolve) => setTimeout(resolve, 200));
        continue;
      }

      // Si no es un error de cuota/saturación (ej: validación de entrada 400), lanzar el error
      throw error;
    }
  }

  // Si todas las claves fallaron por cuota/saturación
  throw new Error(
    `Todas las claves de Gemini (${totalKeys}) han agotado su cuota o el modelo está temporalmente saturado en todas ellas. ` +
    `Detalle del último error: ${lastError?.message || 'Error de saturación'}`
  );
}

/**
 * Función wrapper principal para generateContent con rotación de claves.
 * Modelo por defecto: gemini-3.5-flash-lite
 */
export async function generateContentWithRotation({
  model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  contents,
  config,
}) {
  return callWithKeyRotation(async (ai) => {
    return await ai.models.generateContent({
      model,
      contents,
      config,
    });
  });
}

export { Type };
