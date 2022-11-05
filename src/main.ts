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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  if (process.env.NODE_ENV !== 'prod') {
    const options = new DocumentBuilder()
      .setTitle('API Document')
      .setDescription('Pandora')
      .setVersion(constant.swagger.version)
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(constant.swagger.pathName, app, document);
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.set('trust proxy', 1);
  app.use(
    session({
      name: 'aha-cookie',
      secret: 'my-secret',
      resave: false,
      // proxy: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        signed: true,
        secure: true,
        domain: '.chaunguyen.dev',
        sameSite: 'none',
      },
    }),
  );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
