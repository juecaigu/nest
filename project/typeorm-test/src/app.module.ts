import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
// import { City } from './city/entities/city.entity';
import { CityModule } from './city/city.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

const typeOrmModule = TypeOrmModule.forRoot({
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
  extra: {
    authPlugin: 'sha256_password',
  },
});

@Module({
  imports: [UserModule, typeOrmModule, CityModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
