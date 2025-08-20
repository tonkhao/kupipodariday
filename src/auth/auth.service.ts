import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
    private hashService: HashService,
  ) {}

  auth(user: UserAuth) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    if (user && (await this.hashService.compare(password, user.password))) {
      return { userId: user.id, username: user.username };
    }

    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    const hashed = await this.hashService.hash(createUserDto.password);
    try {
      return await this.usersService.create({
        ...createUserDto,
        password: hashed,
      });
    } catch (err) {
      if (hasCodeProperty(err) && err.code === '23505') {
        throw new ConflictException('Пользователь уже зарегистрирован');
      }
      throw err;
    }
  }
}

export function hasCodeProperty(err: unknown): err is { code: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof (err as Record<string, unknown>).code === 'string'
  );
}
