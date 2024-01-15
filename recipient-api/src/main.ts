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
    .setTitle('Fast Feet\'s Recipients API')
    .setDescription('API for managing recipients that provides shippings for users')
    .setVersion('0.1.0')
    .addTag('recipients')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.get('PORT'));
}
bootstrap();
