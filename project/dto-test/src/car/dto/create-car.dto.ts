import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @MaxLength(200)
  description: string;
}
