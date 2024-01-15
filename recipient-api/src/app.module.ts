import { Module } from '@nestjs/common';
import { EnvModule } from './infra/env/env.module';
import { MessagesModule } from './infra/messages/messages.module';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '@env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule, MessagesModule, DatabaseModule, HttpModule
  ],
})
export class AppModule {}
