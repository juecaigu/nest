import { Injectable } from '@nestjs/common';
import { CreateLifeCycleDto } from './dto/create-life-cycle.dto';
import { UpdateLifeCycleDto } from './dto/update-life-cycle.dto';

@Injectable()
export class LifeCycleService {
  create(createLifeCycleDto: CreateLifeCycleDto) {
    return 'This action adds a new lifeCycle';
  }

  findAll() {
    return `This action returns all lifeCycle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lifeCycle`;
  }

  update(id: number, updateLifeCycleDto: UpdateLifeCycleDto) {
    return `This action updates a #${id} lifeCycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} lifeCycle`;
  }
}
