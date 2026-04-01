import 'reflect-metadata';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { assertPostgresEnvConfigured } from './config/db-env';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  assertPostgresEnvConfigured();
  const app = await NestFactory.create(AppModule);
  const port = Number.parseInt(process.env.PORT ?? '8080', 10);
  await app.listen(port, '0.0.0.0');
  logger.log(`HTTP server listening on 0.0.0.0:${port}`);
}

bootstrap().catch((err: unknown) => {
  const logger = new Logger('Bootstrap');
  logger.error(
    'Application failed to start (fix DB_* env and network to Postgres, then redeploy)',
    err instanceof Error ? err.stack : String(err),
  );
  process.exit(1);
});
