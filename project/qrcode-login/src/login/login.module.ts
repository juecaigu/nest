import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    JwtModule.register({
      secret: 'jiang',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class LoginModule {}
