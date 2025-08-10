import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
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

  @Column()
  description: string;

  @Column()
  owner: TBD;

  @Column()
  offers: TBD;
}
