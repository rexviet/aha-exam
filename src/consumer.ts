// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppConsumerModule } from 'consumer.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppConsumerModule);
}
bootstrap();
