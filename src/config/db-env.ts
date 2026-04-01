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

/** Passed to node-postgres via TypeORM `extra` — avoids hanging TCP on bad routes (e.g. Cloud Run startup budget). */
export function getPostgresDriverExtra(): {
  connectionTimeoutMillis: number;
} {
  return { connectionTimeoutMillis: 20_000 };
}
