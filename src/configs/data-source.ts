// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as path from 'path';

const _path = path.resolve(
  __dirname + '/../modules/**/domain/*.entity{.ts,.js}',
);
console.log('_path:', _path);
export const AppDataSource = new DataSource({
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
console.log('AppDataSource:', AppDataSource.options);
// module.exports = AppDataSource;
