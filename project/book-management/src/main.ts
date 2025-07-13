import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../uploads'), {
    prefix: '/uploads',
  });
  app.enableCors();
  // app.useLogger(new CustomeLogger());
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
