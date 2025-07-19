import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
import { City } from './city/entities/city.entity';
import { CityModule } from './city/city.module';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jiang',
  database: 'typeorm_test',
  synchronize: true,
  logging: true,
  entities: [City],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});

@Module({
  imports: [UserModule, typeOrmModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
