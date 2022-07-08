import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateRateDto } from './dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createRateDto: CreateRateDto, @Request() req) {
    return this.rateService.create(createRateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':currency&:cryptocurrency')
  findOne(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
    @Request() req,
  ) {
    return this.rateService.findOne(currency, cryptocurrency);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(@Request() req) {
    return this.rateService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':currency&:cryptocurrency')
  update(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
    @Body() updateRateDto: UpdateRateDto,
    @Request() req,
  ) {
    return this.rateService.update(currency, cryptocurrency, updateRateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':currency&:cryptocurrency')
  remove(
    @Param('currency') currency: string,
    @Param('cryptocurrency') cryptocurrency: string,
    @Request() req,
  ) {
    return this.rateService.remove(currency, cryptocurrency);
  }
}
