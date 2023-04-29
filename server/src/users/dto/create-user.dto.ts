import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
