import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrcodeModule } from './qrcode/qrcode.module';
import { RedisModule } from './redis/redis.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [QrcodeModule, RedisModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
