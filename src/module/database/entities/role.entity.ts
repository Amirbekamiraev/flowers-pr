import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.role)
  @JoinTable()
  users: UserEntity[];
}
