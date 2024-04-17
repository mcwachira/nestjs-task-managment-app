import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = 3000
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log(`application listening on port ${PORT}`);
}
bootstrap();
