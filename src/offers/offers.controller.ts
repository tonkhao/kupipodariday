import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { AuthReq } from 'src/auth/auth.controller';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOfferDto, @Req() req: AuthReq) {
    const { userId } = req.user;
    return this.offersService.create(dto, Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Query() filter: OfferFilter) {
    return this.offersService.find(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.find({ id: Number(id) });
  }
}
