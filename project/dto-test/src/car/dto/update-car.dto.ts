import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCarDto } from './create-car.dto';
import { TestValidate } from '../validate/test-validate.decorator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @TestValidate('test', {
    message: 'test must be test',
  })
  test: string;
}
