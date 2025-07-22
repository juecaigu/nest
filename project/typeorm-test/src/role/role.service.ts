import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistryDto } from './dto/registry.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import * as crypto from 'crypto';
import { Permission } from './entities/permission.entity';

const md5 = (str: string) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;
  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

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

  async init() {
    const p1 = new Permission();
    p1.name = 'create_article';
    p1.desc = '创建文章';
    const p2 = new Permission();
    p2.name = 'update_article';
    p2.desc = '更新文章';
    const p3 = new Permission();
    p3.name = 'delete_article';
    p3.desc = '删除文章';
    const p4 = new Permission();
    p4.name = 'query_article';
    p4.desc = '查询文章';
    const p5 = new Permission();
    p5.name = 'create_city';
    p5.desc = '创建城市';
    const p6 = new Permission();
    p6.name = 'update_city';
    p6.desc = '更新城市';
    const p7 = new Permission();
    p7.name = 'delete_city';
    p7.desc = '删除城市';
    const p8 = new Permission();
    p8.name = 'query_city';
    p8.desc = '查询城市';
    const r1 = new Role();
    r1.username = 'zhangsan';
    r1.password = md5('123456');
    r1.permissions = [p1, p2, p3, p4];
    const r2 = new Role();
    r2.username = 'lisi';
    r2.password = md5('123456');
    r2.permissions = [p5, p6, p7, p8];
    await this.permissionRepository.save([p1, p2, p3, p4, p5, p6, p7, p8]);
    await this.roleRepository.save([r1, r2]);
    return '初始化成功';
  }

  async findByUsername(username: string) {
    const role = await this.roleRepository.findOne({
      where: {
        username: username,
      },
      relations: ['permissions'],
    });
    return role;
  }
}
