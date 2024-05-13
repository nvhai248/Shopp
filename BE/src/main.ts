import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SITE_PORT } from './utils/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SITE_PORT);
}
bootstrap();
