import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  await app.listen(env.get('PORT'));
}
bootstrap();
