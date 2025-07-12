import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateBookDto {
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
