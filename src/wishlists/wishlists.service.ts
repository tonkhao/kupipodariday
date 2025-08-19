import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from './entities/wishlist.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

export type WishlistFilter = {
  id?: number;
  name?: string;
  ownerId?: number;
};

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(Wishlist)
    private whishlistRepository: Repository<Wishlist>,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createWishlistDto: CreateWishlistDto, ownerId: number) {
    const owner = await this.userRepository.findOneBy({ id: ownerId });
    if (!owner) throw new Error('Владелец не найден');

    const items = createWishlistDto.itemsId?.length
      ? await this.wishRepository.findBy({ id: In(createWishlistDto.itemsId) })
      : [];

    const wishlist = this.whishlistRepository.create({
      ...createWishlistDto,
      owner,
      items,
    });

    return this.whishlistRepository.save(wishlist);
  }

  findAll(filter: WishlistFilter): Promise<Wishlist[]> {
    const where: FindOptionsWhere<Wishlist> = {
      ...(typeof filter.id === 'number' ? { id: filter.id } : {}),
      ...(typeof filter.name === 'string' ? { name: filter.name } : {}),
      ...(typeof filter.ownerId === 'number'
        ? { owner: { id: filter.ownerId } }
        : {}),
    };

    return this.whishlistRepository.find({
      where,
      relations: ['owner', 'items'],
    });
  }

  findById(id: number): Promise<Wishlist | null> {
    return this.whishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist | null> {
    const wishlist = await this.findById(id);
    if (!wishlist) throw new NotFoundException('Не найден обновляемый элемент');
    if (updateWishlistDto.itemsId) {
      wishlist.items = updateWishlistDto.itemsId.length
        ? await this.wishRepository.findBy({
            id: In(updateWishlistDto.itemsId),
          })
        : [];
    }
    const updatedWhishlist = {
      ...wishlist,
      name: updateWishlistDto.name ?? wishlist.name,
      image: updateWishlistDto.image ?? wishlist.image,
    };
    return this.whishlistRepository.save(updatedWhishlist);
  }

  async removeOne(id: number): Promise<Wishlist | null> {
    const wishlist = await this.findById(id);
    if (!wishlist) throw new NotFoundException('Не найден удаляемый элемент');
    await this.whishlistRepository.remove(wishlist);
    return wishlist;
  }
}
