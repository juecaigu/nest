import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistryDto } from './dto/user-registry.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  userService: UserService;

  @Post('registry')
  registry(@Body(ValidationPipe) userRegistryDto: UserRegistryDto) {
    return this.userService.registry(userRegistryDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
