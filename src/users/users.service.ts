import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findOne(filter: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({
      where: filter,
    });

    return user;
  }

  async findByUsername(filter: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({ where: filter });

    return user;
  }

  async update(filter: FindOptionsWhere<User>, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: filter });
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
}
