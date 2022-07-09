import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTCONSTANTS,
      signOptions: { expiresIn: 60 * 30 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
