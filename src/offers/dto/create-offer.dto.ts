import {
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;

  @IsBoolean()
  @IsOptional()
  hidden?: boolean;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  itemId: number;
}
