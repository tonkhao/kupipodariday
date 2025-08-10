import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  item: TBD 

  @Column()
  amount: string;

  @Column()
  hidden: boolean;

  @Column()
  user: TBD 
}
