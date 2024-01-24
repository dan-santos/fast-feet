import { envSchema } from '@env/env';
import { EnvModule } from '@env/env.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './infra/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    MessagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
