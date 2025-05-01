import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { RefId } from 'src/decorators/ref.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLogger,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto, @RefId() refId: string) {
    this.logger.info(`Creating user ${JSON.stringify(createUserDto)}`, refId);
    try {
      return this.userService.create(createUserDto, refId);
    } catch (error) {
      this.logger.error(`Error creating user ${error}`, refId);
      throw error;
    }
  }
  @Get()
  findAll(@RefId() refId: string) {
    this.logger.info('Fetching all users', refId);
    try {
      return this.userService.findAll(refId);
    } catch (error) {
      this.logger.error(`Error fetching users ${error}`, refId);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @RefId() refId: string) {
    this.logger.info(`Fetching user with id ${id}`, refId);
    try {
      return this.userService.findOne(+id, refId);
    } catch (error) {
      this.logger.error(`Error fetching user ${error}`, refId);
      throw error;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @RefId() refId: string,
  ) {
    this.logger.info(
      `Updating user with id ${id} ${JSON.stringify(updateUserDto)}`,
      refId,
    );
    try {
      return this.userService.update(+id, updateUserDto, refId);
    } catch (error) {
      this.logger.error(`Error updating user ${error}`, refId);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @RefId() refId: string) {
    this.logger.info(`Deleting user with id ${id}`, refId);
    try {
      return this.userService.remove(+id, refId);
    } catch (error) {
      this.logger.error(`Error deleting user ${error}`, refId);
      throw error;
    }
  }
}
