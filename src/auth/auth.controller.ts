import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RequestUser } from './jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

export interface AuthReq extends Request {
  user: RequestUser;
}

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Req() req: AuthReq) {
    return this.authService.auth({
      id: req.user.userId,
      username: req.user.username,
    });
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
