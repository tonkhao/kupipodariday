import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  wishes: TBD;

  @Column()
  offers: TBD;

  @Column()
  wishlists: TBD;
}
