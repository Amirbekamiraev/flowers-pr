import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FlowerEntity } from './flower.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => FlowerEntity, { eager: true })
  @JoinColumn({ name: 'flowerId' })
  flower: FlowerEntity;

  @Column()
  quantity: number;
}
