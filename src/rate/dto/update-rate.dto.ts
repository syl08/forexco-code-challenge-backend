import { PartialType } from '@nestjs/mapped-types';
import { CreateRateDto } from './create-rate.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateRateDto extends PartialType(CreateRateDto) {
  @ApiProperty({
    name: 'rate',
    description: 'rate',
  })
  @IsNotEmpty({ message: 'rate is required' })
  rate: number;
}
