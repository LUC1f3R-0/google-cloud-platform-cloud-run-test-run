/**
 * Shared Postgres settings for Nest and TypeORM CLI.
 * Empty DB_HOST makes node-postgres treat the host as localhost — wrong inside Docker/Cloud Run.
 */
export function getPostgresConnectionOptions(): {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
} {
  const host = process.env.DB_HOST?.trim();
  if (!host) {
    throw new Error(
      'DB_HOST must be set (e.g. `postgres` / service name in Docker Compose, or your Cloud SQL / AlloyDB host). Unset or empty DB_HOST defaults to localhost and fails in containers.',
    );
  }
  const username = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim();
  if (!username || !database) {
    throw new Error('DB_USER and DB_NAME must be set.');
  }
  const port = parseInt(process.env.DB_PORT ?? '5432', 10);
  const password = process.env.DB_PASS ?? '';
  return { host, port, username, password, database };
}

/**
 * Call once from `main.ts` before `NestFactory.create` so missing DB_* fails with a clear
 * message and stack (bootstrap), not inside `dist/app.module.js` / TypeORM factory frames.
 */
export function assertPostgresEnvConfigured(): void {
  try {
    getPostgresConnectionOptions();
  } catch (e) {
    const inner = e instanceof Error ? e.message : String(e);
    throw new Error(
      `[postgres-env] ${inner} ` +
        `Set DB_HOST, DB_USER, DB_NAME (optional: DB_PORT default 5432, DB_PASS). ` +
        `Cloud Run: service → Variables & Secrets. Local: copy .env.example to .env or use docker compose.`,
    );
  }
}

/** Passed to node-postgres via TypeORM `extra` — avoids hanging TCP on bad routes (e.g. Cloud Run startup budget). */
export function getPostgresDriverExtra(): {
  connectionTimeoutMillis: number;
} {
  return { connectionTimeoutMillis: 20_000 };
}
