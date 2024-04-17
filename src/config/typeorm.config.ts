import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.RDS_HOSTNAME || dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_HOSTNAME || dbConfig.port,
  username: process.env.RDS_HOSTNAME || dbConfig.username,
  password: process.env.RDS_HOSTNAME || dbConfig.password,
  database: process.env.RDS_HOSTNAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize, //production not true
}