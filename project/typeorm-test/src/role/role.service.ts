import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistryDto } from './dto/registry.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import * as crypto from 'crypto';

const md5 = (str: string) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  async login(loginDto: LoginDto) {
    const findOne = await this.roleRepository.findOneBy({
      username: loginDto.username,
    });
    if (findOne) {
      if (findOne.password === md5(loginDto.password)) {
        return findOne;
      }
      return null;
    }
    return null;
  }

  async register(registryDto: RegistryDto) {
    const findOne = await this.roleRepository.findOneBy({
      username: registryDto.username,
    });
    if (findOne) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const role = new Role();
    role.username = registryDto.username;
    role.password = md5(registryDto.password);
    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException('注册失败' + error, HttpStatus.BAD_REQUEST);
    }
    return {
      message: '注册成功',
    };
  }
}
