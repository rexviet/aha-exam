// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppCronModule } from './cron.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppCronModule);
}
bootstrap();
