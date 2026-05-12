import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'mariachi_admin_session';
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 8;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

export function createAdminSession() {
  const issuedAt = Date.now().toString();
  const payload = `${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split('.');
  if (!issuedAt || !signature) return false;
  if (sign(issuedAt) !== signature) return false;
  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age >= 0 && age <= DEFAULT_TTL_MS;
}
export async function getAdminToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function isAdminAuthed() {
  return verifyAdminSession(await getAdminToken());
}

export function adminCookieName() {
  return COOKIE_NAME;
}
