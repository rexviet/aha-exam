// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import constant from '@configs/constant';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'filters/all-exceptions-filter';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  });
  if (process.env.NODE_ENV !== 'prod') {
    const options = new DocumentBuilder()
      .setTitle('API Document')
      .setDescription('Aha Exam')
      .setVersion(constant.swagger.version)
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(constant.swagger.pathName, app, document, {
      swaggerOptions: {
        withCredentials: true,
      },
    });
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.set('trust proxy', 1);
  const RedisStore = connectRedis(session);
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    legacyMode: true,
  });
  await redisClient.connect();
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        signed: true,
        // secure: true,
        domain: process.env.SESSION_DOMAIN,
        sameSite: 'lax',
      },
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
