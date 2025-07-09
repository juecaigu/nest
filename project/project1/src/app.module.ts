import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PersonController } from './person/person.controller';
import { LoginModule } from './login/login.module';
import { CarMiddleware } from './middleware/car.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PersonModule, LoginModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(PersonController);
    consumer.apply(CarMiddleware).forRoutes('*');
  }
}
