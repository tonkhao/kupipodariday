import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 250,
  })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column()
  copied: number;

  @Column({
    length: 1024,
  })
  description: string;

  @Column()
  owner: TBD;

  @Column()
  offers: TBD;
}
