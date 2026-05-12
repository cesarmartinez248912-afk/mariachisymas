import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

export function hasNeonConfig() {
  return Boolean(connectionString);
}

export function getNeonClient() {
  if (!connectionString) return null;
  return neon(connectionString);
}
