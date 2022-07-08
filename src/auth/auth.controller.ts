import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
