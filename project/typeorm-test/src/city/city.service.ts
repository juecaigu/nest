import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CityService {
  @InjectRepository(City)
  private cityRepository: Repository<City>;
  @InjectEntityManager()
  private manager: EntityManager;

  async create(createCityDto: CreateCityDto) {
    const parent = await this.cityRepository.findOne({
      where: {
        name: createCityDto.parent,
      },
    });
    if (!parent) {
      const city = new City();
      city.name = createCityDto.parent;
      city.status = 1;
      await this.cityRepository.save(city);
    }
    const iParent = await this.cityRepository.findOne({
      where: {
        name: createCityDto.parent,
      },
    });
    if (iParent) {
      const child = new City();
      child.name = createCityDto.name;
      child.parent = iParent;
      await this.cityRepository.save(child);
    }
    return '创建成功';
  }

  findAll() {
    return this.manager.getTreeRepository(City).findTrees();
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
