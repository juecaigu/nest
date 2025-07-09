import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRegistryDto } from './dto/user-registry.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user-entities';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async registry(userRegistryDto: UserRegistryDto) {
    const users: User[] = (await this.dbService.read()) as User[];
    const findUser = users.find(
      (user) => user.username === userRegistryDto.username,
    );
    if (findUser) {
      throw new BadRequestException('用户已经注册');
    }
    const user = new User();
    user.username = userRegistryDto.username;
    user.password = userRegistryDto.password;
    users.push(user);
    await this.dbService.write(users);
    return '注册成功';
  }

  async login(userLoginDto: UserLoginDto) {
    const users: User[] = (await this.dbService.read()) as User[];
    const findUser = users.find((user) => {
      return (
        user.username === userLoginDto.username &&
        user.password === userLoginDto.password
      );
    });
    if (!findUser) {
      throw new BadRequestException('用户名或密码错误');
    }
    return '登录成功';
  }
}
