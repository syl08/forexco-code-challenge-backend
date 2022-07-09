import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRateDto, CreateRateDto } from './dto';

@Injectable()
export class RateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRateDto: CreateRateDto) {
    // check the rate exists in database or not
    const existsRate = await this.prismaService.rate.findUnique({
      where: {
        rateId: {
          currency: createRateDto.currency,
          cryptocurrency: createRateDto.cryptocurrency,
        },
      },
    });
    if (existsRate) {
      throw new ConflictException('rate exists');
    }
    const newRate = await this.prismaService.rate.create({
      data: createRateDto,
    });
    return newRate;
  }

  async findOne(currency: string, cryptocurrency: string) {
    const rate = await this.prismaService.rate.findUnique({
      where: {
        rateId: { currency, cryptocurrency },
      },
    });
    if (!rate) {
      throw new NotFoundException('rate not found');
    }
    return rate;
  }

  async findAll() {
    return this.prismaService.rate.findMany();
  }

  async update(
    currency: string,
    cryptocurrency: string,
    updateRateDto: UpdateRateDto,
  ) {
    const rate = await this.prismaService.rate.findUnique({
      where: {
        rateId: { currency, cryptocurrency },
      },
    });
    if (!rate) {
      throw new NotFoundException('rate not found');
    }

    const update = await this.prismaService.rate.update({
      where: {
        rateId: { currency, cryptocurrency },
      },
      data: {
        rate: updateRateDto.rate,
      },
    });
    return update;
  }

  async remove(currency: string, cryptocurrency: string) {
    const rate = await this.prismaService.rate.findUnique({
      where: {
        rateId: { currency, cryptocurrency },
      },
    });
    if (!rate) {
      throw new NotFoundException('rate not found');
    }

    const remove = await this.prismaService.rate.delete({
      where: {
        rateId: { currency, cryptocurrency },
      },
    });
    return remove;
  }
}
