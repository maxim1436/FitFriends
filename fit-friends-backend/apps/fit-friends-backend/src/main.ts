/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfig } from './config/rabbitmq.config';

import { AppModule } from './app/app.module';

const DEFAULT_PORT = 3333;
const GLOBAL_PREFIX = 'api';
const PORT = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  const config = new DocumentBuilder()
    .setTitle('The "Users" service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
