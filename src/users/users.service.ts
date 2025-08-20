import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async getWishesByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishes'],
    });
    return user?.wishes ?? [];
  }

  async findOne(filter: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({
      where: filter,
    });

    return user;
  }

  async updateOne(
    filter: FindOptionsWhere<User>,
    dto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: filter });
    if (!user) return null;
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async findMany(query: string): Promise<User[]> {
    const result = await this.userRepository.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
    });
    return result || [];
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

  async getWishesByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: [
        'wishes',
        'wishes.owner',
        'wishes.offers',
        'wishes.offers.user',
      ],
    });
    if (!user) return [];
    user.wishes.forEach((wish) => {
      wish.offers = wish.offers.filter((offer) => !offer.hidden);
    });
    return user.wishes;
  }
}
