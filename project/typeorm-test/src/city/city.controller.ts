import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { roleGuard } from 'src/role/guard/role.guard';
import { PermissionGuard } from 'src/role/guard/permission.guard';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('create')
  @UseGuards(roleGuard)
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get('findAll')
  @SetMetadata('permission', 'query_city')
  @UseGuards(roleGuard, PermissionGuard)
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  @UseGuards(roleGuard)
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(roleGuard)
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  @UseGuards(roleGuard)
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
