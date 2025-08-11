import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  owner: TBD;

  @Column()
  items: TBD;
}
