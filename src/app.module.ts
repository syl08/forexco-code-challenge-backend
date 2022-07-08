import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RateModule } from './rate/rate.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RateModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
