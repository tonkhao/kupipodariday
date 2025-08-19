import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { AuthReq } from 'src/auth/auth.controller';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: AuthReq) {
    return this.wishlistsService.create(createWishlistDto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: Record<string, string>) {
    const filter = {
      id: query.id ? Number(query.id) : undefined,
      ownerId: query.ownerId ? Number(query.ownerId) : undefined,
      name: query.name,
    };
    return this.wishlistsService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.wishlistsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWishlistDto,
    @Req() req: AuthReq,
  ) {
    const wishlistId = Number(id);
    const wl = await this.wishlistsService.findById(wishlistId);
    if (!wl) throw new NotFoundException('Подборка не найдена');
    if (wl.owner.id !== req.user.userId) {
      throw new ForbiddenException('Можно менять только свои подборки');
    }
    return this.wishlistsService.updateOne(wishlistId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthReq) {
    const wishlistId = Number(id);
    const wl = await this.wishlistsService.findById(wishlistId);
    if (!wl) throw new NotFoundException('Подборка не найдена');
    if (wl.owner.id !== req.user.userId) {
      throw new ForbiddenException('Можно удалять только свои подборки');
    }
    return this.wishlistsService.removeOne(wishlistId);
  }
}
