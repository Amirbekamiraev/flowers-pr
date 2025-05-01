import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/auth.dto';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLogger,
  ) {}

  async login(userDto: loginDto, refId: string) {
    this.logger.info(`Login user ${JSON.stringify(userDto)}`, refId);
    try {
      const user = await this.loginIn(userDto, refId);
      if (!user) {
        return { error: 'Пользователь не найден' };
      }
      console.log('userrolrneed', user);

      const token = this.generateToken(user, refId);
      return {
        role: user.role[0].role,
        name: user.name,
        email: user.email,
        token: token.token,
      };
    } catch (error) {
      this.logger.error(`Error login user ${error}`, refId);

      if (error instanceof NotFoundException) {
        return { error: 'Пользователь не найден' }; // Отдаем 404 в виде JSON-ответа
      }
      throw error;
    }
  }

  generateToken(user: UserEntity, refId: string) {
    this.logger.info(`Generating token for user ${user.email}`, refId);
    try {
      const payload = { email: user.email, id: user.id, role: user.role };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (error) {
      this.logger.error(`Error generating token ${error}`, refId);
      throw error;
    }
  }
  async registration(userDto: CreateUserDto, refId: string) {
    const register = await this.userService.getCheckedEmail(
      userDto.email,
      refId,
    );
    if (register) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(userDto, refId);

    return user;
  }

  private async loginIn(userDto, refId: string) {
    this.logger.info(`Login user ${JSON.stringify(userDto)}`, refId);
    try {
      const user = await this.userService.getCheckedEmail(userDto.email, refId);

      if (!user) {
        return null;
      }

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (!passwordEquals) {
        throw new UnauthorizedException('Неверный пароль');
      }
      return user;
    } catch (error) {
      this.logger.error(`Error login user ${error}`, refId);
      return null;
    }
  }
}
