import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('api/person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    @Inject('person_mock') private readonly personMock: any,
    @Inject('person_factory') private readonly personFactory: any,
  ) {}

  @Post('create')
  create(@Body() createPersonDto: CreatePersonDto) {
    console.log('handler');
    return this.personService.create(createPersonDto);
  }

  @Get('find')
  findAll(@Query('name') name: string, @Query('age') age: number) {
    return this.personService.find(name, age);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
