import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [UserModule, RateModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
