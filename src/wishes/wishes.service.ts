import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createWishDto: CreateWishDto, ownerId: number) {
    const owner = await this.userRepository.findOneBy({ id: ownerId });
    if (!owner) throw new BadRequestException('Owner not found');
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner,
      raised: 0,
      copied: 0,
    });
    return this.wishRepository.save(wish);
  }

  async findOneById(id: number, viewerId?: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!wish) throw new NotFoundException('Wish not found');
    if (viewerId !== wish.owner.id) {
      wish.offers = wish.offers.filter((offer) => !offer.hidden);
    }
    return wish;
  }

  async updateProtectedWish(
    id: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<Wish> {
    const wish = await this.findOneById(id);
    if (wish.owner.id !== userId)
      throw new ForbiddenException('Можно редактировать только свои желания!');

    if ('price' in updateWishDto && wish.offers && wish.offers.length > 0) {
      throw new BadRequestException(
        'Нельзя менять стоимость, уже есть желающие!',
      );
    }
    if ('raised' in updateWishDto) delete updateWishDto.raised;
    Object.assign(wish, updateWishDto);
    return this.wishRepository.save(wish);
  }

  async removeProtectedWish(id: number, userId: number): Promise<Wish> {
    const wish = await this.findOneById(id);
    if (wish.owner.id !== userId)
      throw new ForbiddenException('Можно удалять только свои желания!');
    await this.wishRepository.remove(wish);
    return wish;
  }

  getLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner'],
    });
  }

  getTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
      relations: ['owner'],
    });
  }

  async copyWish(id: number, userId: number): Promise<Wish> {
    const original = await this.findOneById(id);
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    original.copied += 1;
    await this.wishRepository.save(original);
    const copy = this.wishRepository.create({
      name: original.name,
      link: original.link,
      image: original.image,
      price: original.price,
      description: original.description,
      owner: user,
      raised: 0,
      copied: 0,
    });
    return this.wishRepository.save(copy);
  }
}
