import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/entities/article.entity';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'jiang',
  database: 'typeorm_test',
  synchronize: true,
  logging: true,
  entities: [Article, User],
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
    ArticleModule,
    typeOrmModule,
    jwtModule,
    RedisModule,
    TaskModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
