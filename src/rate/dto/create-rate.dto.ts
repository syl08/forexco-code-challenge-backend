import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRateDto {
  @ApiProperty({
    name: 'currency',
    description: 'currency',
  })
  @IsNotEmpty({ message: 'currency is required' })
  currency: string;
  @ApiProperty({
    name: 'cryptocurrency',
    description: 'cryptocurrency',
  })
  @IsNotEmpty({ message: 'cryptocurrency is required' })
  cryptocurrency: string;
  @ApiProperty({
    name: 'rate',
    description: 'rate',
  })
  @IsNotEmpty({ message: 'rate is required' })
  rate: number;
}
