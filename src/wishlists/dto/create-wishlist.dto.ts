import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWishlistDto {
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
