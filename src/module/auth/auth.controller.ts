import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefId } from 'src/decorators/ref.decorator';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { loginDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLogger,
  ) {}
  @ApiOperation({ summary: 'Sign-in' })
  @ApiResponse({ status: 200, type: [loginDto] })
  @Post('login')
  async login(@Body() userDto: loginDto, @RefId() refId: string) {
    this.logger.info(`[START] login in site`, refId);
    try {
      const user = await this.authService.login(userDto, refId);
      return user;
    } catch (error) {
      this.logger.error(
        `[ERROR login in site ${JSON.stringify(userDto)}  `,
        refId,
      );
      throw error;
    }
  }
  @ApiOperation({ summary: 'Sign-up' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto, @RefId() refId: string) {
    this.logger.info(`[START] registration in site`, refId);
    try {
      return this.authService.registration(userDto, refId);
    } catch (error) {
      this.logger.error(`[ERROR] registration in site`, refId);
      throw error;
    }
  }
}
