import { IsInt, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateWishlistDto {
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @MaxLength(1500)
  description: string;

  @IsUrl()
  image: string;

  @IsInt()
  itemIds: number[];
}
