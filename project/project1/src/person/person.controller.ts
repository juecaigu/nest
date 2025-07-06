import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Inject,
  UseInterceptors,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { ValidationPipe } from 'src/common/validationPipe.pipe';
import { CustomPipe } from 'src/common/custome.pipe';

@Controller('api/person')
@UseInterceptors(TimeInterceptor)
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
  findAll(
    @Query('name') name: string,
    @Query('age', ValidationPipe) age: number,
  ) {
    return this.personService.find(name, age);
  }

  @Get('delete')
  remove(@Query('id', CustomPipe) id: number) {
    return this.personService.remove(id);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          return new HttpException('must be a number', HttpStatus.BAD_REQUEST);
        },
      }),
    )
    id: number,
  ) {
    return this.personService.findOne(+id);
  }
}
