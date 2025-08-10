import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  wishes: TBD;

  @Column()
  offers: TBD;

  @Column()
  wishlists: TBD;
}
