import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Patch,
  ConflictException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthReq } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { hasCodeProperty } from 'src/auth/auth.service';
import { HashService } from 'src/hash/hash.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('find')
  findMany(@Body('query') query: string) {
    return this.usersService.findMany(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthReq) {
    const user = await this.usersService.findOne({
      id: Number(req.user.userId),
    });
    if (user) {
      const secureUserData: Partial<User> = { ...user };
      delete secureUserData.password;
      return secureUserData;
    }
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getMyWishes(@Req() req: AuthReq) {
    return this.usersService.getWishesByUserId(Number(req.user.userId));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/')
  async updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: AuthReq) {
    const user = await this.usersService.findOne({
      id: Number(req.user.userId),
    });
    const updatedUser = { user, ...updateUserDto };
    try {
      const serviceReturn = await this.usersService.updateOne(
        {
          id: Number(req.user.userId),
        },
        updatedUser,
      );
      const secureUserData: Partial<User> = {
        ...serviceReturn,
      };
      delete secureUserData.password;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete (secureUserData as any).user;
      return secureUserData;
    } catch (e) {
      if (hasCodeProperty(e) && e.code === '23505') {
        throw new ConflictException(
          'Пользователь с таким email или username уже зарегистрирован',
        );
      }
      throw e instanceof Error ? e : new Error(String(e));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOne({ username });
    if (user) {
      const secureUserData: Partial<User> = { ...user };
      delete secureUserData.password;
      return secureUserData;
    }
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getWishesByUsername(username);
  }
}
