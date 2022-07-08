import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    // before insert user information, check username exists or not in database
    const existedUser = await this.findOne(createUserDto.username);

    if (existedUser) {
      throw new ConflictException('username exists');
    }
    // hash password before insert to database
    const hashPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        password: hashPassword,
      },
    });
    return newUser;
  }

  async findOne(username: string) {
    return this.prismaService.user.findUnique({ where: { username } });
  }
}
