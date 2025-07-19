import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  // 可以这样注入userRepository，在user.module.ts的imports中添加TypeOrmModule.forFeature([User])
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    // 通过userRepository保存，或者通过manager调用save方法
    await this.userRepository.save(createUserDto);
    // await this.manager.save(User, createUserDto);
    return '保存成功';
  }

  findAll() {
    return this.manager.find(User);
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: {
        id,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.manager.update(User, updateUserDto.id, updateUserDto);
    return this.findAll();
  }

  async remove(id: number) {
    await this.manager.delete(User, id);
    return '删除成功';
  }
}
