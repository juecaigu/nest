import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jiang',
  database: 'typeorm_test',
  synchronize: false,
  logging: true,
  entities: [Article],
  poolSize: 10,
  connectorPackage: 'mysql2',
  migrations: ['src/migration/*.ts'],
  extra: {
    authPlugin: 'sha256_password',
  },
});
