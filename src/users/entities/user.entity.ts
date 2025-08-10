import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 64,
  })
  username: string;

  @Column({
    length: 200,
  })
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
