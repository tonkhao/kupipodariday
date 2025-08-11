import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  item: TBD;

  @Column()
  @IsString()
  amount: string;

  @Column()
  hidden: boolean;

  @Column()
  user: TBD;
}
