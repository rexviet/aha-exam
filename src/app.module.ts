import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UserModule } from '@modules/user/user.module';
import { QueueModule, ISQSOptions } from '@modules/shared/module-queue';
import { ConfigModule, ConfigService } from '@nestjs/config';

const _path = path.resolve(__dirname + '/modules/**/domain/*.entity{.ts,.js}');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [_path],
      synchronize: false,
      migrations: ['dist/migration/*js'],
      schema: process.env.TYPEORM_SCHEMA,
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),
    QueueModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: ISQSOptions = {
          prefix: configService.get('ARN_PREFIX', 'default'),
          sns: configService.get('SNS_ARN', ''),
          sqs: configService.get('SQS_URL', ''),
          accessKeyId: configService.get('AWS_ACCESS_KEY', ''),
          secretAccessKey: configService.get('AWS_ACCESS_SECRET', ''),
          region: configService.get('AWS_REGION', 'ap-southeast-1'),
          apiVersion: configService.get('SQS_API_VERSION', '2012-11-05'),
        };
        return {
          ...options,
          logger: new Logger(),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
