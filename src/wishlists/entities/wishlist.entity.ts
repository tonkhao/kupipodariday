import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  owner: TBD;

  @Column()
  items: TBD;
}
