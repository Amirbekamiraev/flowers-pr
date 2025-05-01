import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { RoleService } from '../role/role.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly roleRepository: RoleService,
    private readonly logger: CustomLogger,
  ) {}
  async create(createUserDto: CreateUserDto, refId: string) {
    this.logger.info(`Creating user ${JSON.stringify(createUserDto)}`, refId);
    try {
      const user = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (user) {
        throw new HttpException(
          'Пользователь с таким email существует',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const role = await this.roleRepository.getRoleByName('USER', refId);

        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        const newUser = await this.userRepository.create({
          name: createUserDto.name,
          email: createUserDto.email,
          age: createUserDto.age,
          password: hashPassword,
          role: [role],
        });
        const saveUser = await this.userRepository.save(newUser);
        return this.generateToken(saveUser);
      }
    } catch (error) {
      this.logger.error(`Error creating user ${error}`, refId);
      throw error;
    }
  }

  generateToken(user: UserEntity) {
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }
  findAll(refId: string) {
    this.logger.info('Fetching all users', refId);
    try {
      return this.userRepository.find({ relations: ['role'] });
    } catch (error) {
      this.logger.error(`Error fetching users ${error}`, refId);
      throw error;
    }
  }

  findOne(id: number, refId: string) {
    this.logger.info(`Fetching user with id ${id}`, refId);
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`Error fetching user ${error}`, refId);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, refId: string) {
    this.logger.info(`Updating user with id ${id}`, refId);
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.update(id, updateUserDto);
      return { ...user, ...updateUserDto };
    } catch (error) {
      this.logger.error(`Error updating user ${error}`, refId);
      throw error;
    }
  }

  async remove(id: number, refId: string) {
    this.logger.info(`Deleting user with id ${id}`, refId);
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });
      if (!user) {
        throw new Error('User not found');
      }

      user.role = [];
      await this.userRepository.save(user);
      if (!user) {
        throw new Error('User not found');
      }
      return this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(`Error deleting user ${error}`, refId);
      throw error;
    }
  }

  async getCheckedEmail(email: string, refId: string) {
    this.logger.info(`Checking email ${email}`, refId);
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['role'],
      });

      return user;
    } catch (error) {
      this.logger.error(`Error checking email ${error}`, refId);
      throw new Error('Пользователь не найден');
    }
  }
}
