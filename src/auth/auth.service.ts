import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from 'src/hash/hash.service';

//TODO: tongkhao: как взять свойства из существующего класса?
interface UserAuth {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hash: HashService,
  ) {}

  auth(user: UserAuth) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    if (user && (await this.hash.compare(password, user.password))) {
      return { userId: user.id, username: user.username };
    }

    return null;
  }
}
