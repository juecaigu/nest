import {
  Body,
  Controller,
  Inject,
  LoggerService,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistryDto } from './dto/user-registry.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/winston.module';

@Controller('user')
export class UserController {
  @Inject(UserService)
  userService: UserService;
  @Inject(WINSTON_LOGGER_TOKEN)
  private readonly logger: LoggerService;

  @Post('registry')
  registry(@Body(ValidationPipe) userRegistryDto: UserRegistryDto) {
    this.logger.log('registry', userRegistryDto);
    return this.userService.registry(userRegistryDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
