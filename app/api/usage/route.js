export const dynamic = 'force-dynamic';

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const USAGE_FILE = join(DATA_DIR, 'usage.json');

function getUsage() {
  if (!existsSync(USAGE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(USAGE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');

  if (!uid) {
    return Response.json({ error: 'uid requerido' }, { status: 400 });
  }

  const usage = getUsage();
  const usadas = usage[uid] || 0;
  const limite = 3;

  return Response.json({ usadas, limite, restantes: Math.max(0, limite - usadas) });
}
