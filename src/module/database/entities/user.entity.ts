import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { CartEntity } from './cart.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  role: RoleEntity[];

  @OneToMany(() => CartEntity, (item) => item.user)
  cart: CartEntity[];
}
