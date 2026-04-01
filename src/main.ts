import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function logDbEnvPresence(): void {
  console.log(
    '[startup] DB env: ' +
      JSON.stringify({
        DB_HOST: process.env.DB_HOST?.trim() || '(unset)',
        DB_PORT: process.env.DB_PORT ?? '(unset)',
        DB_USER: process.env.DB_USER?.trim() || '(unset)',
        DB_NAME: process.env.DB_NAME?.trim() || '(unset)',
        DB_PASS_set: Boolean(process.env.DB_PASS?.length),
      }),
  );
}

async function bootstrap() {
  logDbEnvPresence();
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT ?? 8080;
    await app.listen(port, '0.0.0.0');
    console.log(`[startup] listening on 0.0.0.0:${port}`);
  } catch (err) {
    console.error('[startup] failed:', err);
    process.exit(1);
  }
}

bootstrap();
