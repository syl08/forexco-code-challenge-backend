import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    name: 'username',
  })
  @IsNotEmpty({ message: 'username is required' })
  username: string;
  @ApiProperty({
    name: 'password',
  })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
