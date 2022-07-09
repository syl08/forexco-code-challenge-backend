import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateRateDto } from './dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createRateDto: CreateRateDto) {
    return this.rateService.create(createRateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get/:currency&:cryptocurrency')
  findOne(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
  ) {
    return this.rateService.findOne(currency, cryptocurrency);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.rateService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('patch/:currency&:cryptocurrency')
  update(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
    @Body() updateRateDto: UpdateRateDto,
  ) {
    return this.rateService.update(currency, cryptocurrency, updateRateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:currency&:cryptocurrency')
  remove(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
  ) {
    return this.rateService.remove(currency, cryptocurrency);
  }
}
