import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegistryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  password: string;
}
