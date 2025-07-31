import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async create(createUserDto: UserDto) {
    const username = createUserDto.username;
    const findUser = await this.userRepository.findOne({ where: { username } });
    if (findUser) {
      throw new BadRequestException('用户名已存在');
    }
    const newUser = new User();
    newUser.username = username;
    newUser.password = createUserDto.password;
    return this.userRepository.save(newUser);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async login(loginUserDto: UserDto) {
    const username = loginUserDto.username;
    const password = loginUserDto.password;
    const findUser = await this.userRepository.findOne({ where: { username } });
    if (!findUser) {
      throw new BadRequestException('用户名或密码错误');
    }
    if (findUser.password !== password) {
      throw new BadRequestException('用户名或密码错误');
    }
    const token = this.jwtService.sign({
      id: findUser.id,
      username: findUser.username,
    });
    return {
      token: token,
    };
  }
}
