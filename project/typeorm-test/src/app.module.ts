import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
// import { City } from './city/entities/city.entity';
import { CityModule } from './city/city.module';
import { ArticleModule } from './article/article.module';
// import { Article } from './article/entities/article.entity';
import { ConfigService } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
const configService = new ConfigService();

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: configService.get('host'),
  port: configService.get('port'),
  username: configService.get('username'),
  password: configService.get('password'),
  database: configService.get('database'),
  synchronize: true,
  logging: true,
  entities: [Role],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});

const jwtModule = JwtModule.register({
  global: true,
  secret: 'jiang',
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [
    UserModule,
    typeOrmModule,
    CityModule,
    ArticleModule,
    RoleModule,
    jwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
