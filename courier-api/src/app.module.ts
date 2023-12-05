import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { EnvModule } from './infra/env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule, 
    DatabaseModule, 
    EnvModule
  ]
})
export class AppModule {}
