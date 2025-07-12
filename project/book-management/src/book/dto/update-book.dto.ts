import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class UpdateBookDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @MaxLength(500)
  @IsString()
  description: string;
  @IsString()
  cover: string;
}
