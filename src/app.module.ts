import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UserModule } from '@modules/user/user.module';

const _path = path.resolve(__dirname + '/modules/**/domain/*.entity{.ts,.js}');
console.log('_path:', _path);
console.log('opts:', {
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
});
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
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
