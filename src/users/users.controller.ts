import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthReq } from 'src/auth/auth.controller';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: AuthReq) {
    const where: FindOptionsWhere<User> = { id: Number(req.user.userId) };
    return this.usersService.findOne(where);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
