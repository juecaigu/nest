import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'], // logger = false
  });
  app.useStaticAssets('public', { prefix: '/static' });
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'version', // 在请求头的header中带version字段来确定用哪个版本的接口
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
