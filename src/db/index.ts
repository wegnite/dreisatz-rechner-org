/**
 * Connect to PostgreSQL Database (Supabase/Neon/Local PostgreSQL)
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

function getHyperdriveConnectionString(): string | undefined {
  try {
    const context = Reflect.get(
      globalThis,
      Symbol.for('__cloudflare-context__')
    ) as { env?: { HYPERDRIVE?: { connectionString?: string } } } | undefined;
    return context?.env?.HYPERDRIVE?.connectionString;
  } catch {
    return undefined;
  }
}

export async function getDb() {
  if (db) return db;

  const hyperdriveConnection = getHyperdriveConnectionString();
  const connectionString = hyperdriveConnection ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  if (hyperdriveConnection) {
    console.log('[db] Using Hyperdrive connection');
  } else {
    console.warn('[db] Using DATABASE_URL fallback');
  }

  const client = postgres(connectionString, { prepare: false });
  db = drizzle(client, { schema });
  return db;
}

/**
 * Connect to Neon Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 */
// import { drizzle } from 'drizzle-orm/neon-http';
// const db = drizzle(process.env.DATABASE_URL!);

/**
 * Database connection with Drizzle
 * https://orm.drizzle.team/docs/connect-overview
 *
 * Drizzle <> PostgreSQL
 * https://orm.drizzle.team/docs/get-started-postgresql
 *
 * Get Started with Drizzle and Neon
 * https://orm.drizzle.team/docs/get-started/neon-new
 *
 * Drizzle with Neon Postgres
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-neon
 *
 * Drizzle <> Neon Postgres
 * https://orm.drizzle.team/docs/connect-neon
 *
 * Drizzle with Supabase Database
 * https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
 */
