import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LifeCycleModule } from './life-cycle/life-cycle.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PersonController } from './person/person.controller';

@Module({
  imports: [PersonModule, LifeCycleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(PersonController);
  }
}
