import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { AuthReq } from 'src/auth/auth.controller';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req: AuthReq) {
    return this.wishesService.create(createWishDto, Number(req.user.userId));
  }

  @Get('last')
  getLast() {
    return this.wishesService.getLast();
  }

  @Get('top')
  getTop() {
    return this.wishesService.getTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string, @Req() req: AuthReq) {
    const wishId = Number(id);
    const viewerId = req.user?.userId;
    return this.wishesService.findOneById(wishId, viewerId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWishDto,
    @Req() req: AuthReq,
  ) {
    const wishId = Number(id);
    return this.wishesService.updateProtectedWish(
      wishId,
      dto,
      Number(req.user.userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthReq) {
    const wishId = Number(id);
    return this.wishesService.removeProtectedWish(
      wishId,
      Number(req.user.userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copy(@Param('id') id: string, @Req() req: AuthReq) {
    const wishId = Number(id);
    return this.wishesService.copyWish(wishId, Number(req.user.userId));
  }
}
