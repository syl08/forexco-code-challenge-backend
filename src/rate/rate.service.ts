import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';

@Injectable()
export class RateService {
  create(createRateDto: CreateRateDto) {
    return 'This action adds a new rate';
  }

  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
