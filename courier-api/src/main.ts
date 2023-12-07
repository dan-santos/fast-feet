import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@env/env.service';
import { ErrorHandlerInterceptor } from './error-handler/error-handler.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  app.useGlobalInterceptors(new ErrorHandlerInterceptor());
  await app.listen(env.get('PORT'));
}
bootstrap();
