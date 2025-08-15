import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RequestUser } from './jwt.strategy';

export interface AuthReq extends Request {
  user: RequestUser;
}

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //   @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req: AuthReq) {
    console.log('req');
    console.log(req);
    return this.authService.auth({
      id: req.user.userId,
      username: req.user.username,
    });
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    console.log('signup');
    console.log(createUserDto);
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }
}
