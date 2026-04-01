import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {
  getPostgresConnectionOptions,
  getPostgresDriverExtra,
} from './postgres-env';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres' as const,
        ...getPostgresConnectionOptions(),
        extra: getPostgresDriverExtra(),
        entities: [User],
        synchronize: false,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
