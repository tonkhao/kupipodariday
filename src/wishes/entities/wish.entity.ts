import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish {
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
  link: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsInt()
  price: number;

  @Column()
  @IsInt()
  raised: number;

  @Column()
  @IsInt()
  copied: number;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToOne(() => User, (user) => user.offers)
  offers: Offer;
}
