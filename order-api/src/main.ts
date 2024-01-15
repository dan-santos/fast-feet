import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@env/env.service';
import { ErrorHandlerInterceptor } from './error-handler/error-handler.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  app.useGlobalInterceptors(new ErrorHandlerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Fast Feet\'s Orders API')
    .setDescription('API for managing orders of users')
    .setVersion('0.1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.get('PORT'));
}
bootstrap();
