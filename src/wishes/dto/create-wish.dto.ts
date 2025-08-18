import { IsString, Length, IsUrl, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsString()
  @IsUrl()
  image: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
