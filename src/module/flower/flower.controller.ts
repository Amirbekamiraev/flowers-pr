import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FlowerService } from './flower.service';
import { FlowerDto } from './dto/flower.dto';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { RefId } from 'src/decorators/ref.decorator';

@Controller('flower')
export class FlowerController {
  constructor(
    private readonly flowerService: FlowerService,
    private readonly logger: CustomLogger,
  ) {}

  @Post()
  async create(@Body() dto: FlowerDto, @RefId() refId: string) {
    this.logger.info('[CONTROLLER] create flower', refId);
    try {
      const result = await this.flowerService.create(dto, refId);
      this.logger.debug('[CONTROLLER] success create flower', refId);
      return result;
    } catch (error) {
      this.logger.error(`[CONTROLLER] error create flower: ${error}`, refId);
      throw new HttpException(
        'Failed to create flower',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll(@RefId() refId: string) {
    this.logger.info('[CONTROLLER] get all flowers', refId);
    try {
      const result = await this.flowerService.getAll(refId);
      this.logger.debug('[CONTROLLER] success get all flowers', refId);
      return result;
    } catch (error) {
      this.logger.error(`[CONTROLLER] error get all flowers: ${error}`, refId);
      throw new HttpException(
        'Failed to get flowers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getById(@Param('id') id: number, @RefId() refId: string) {
    this.logger.info(`[CONTROLLER] get flower by id: ${id}`, refId);
    try {
      const result = await this.flowerService.getById(id, refId);
      this.logger.debug('[CONTROLLER] success get flower by id', refId);
      return result;
    } catch (error) {
      this.logger.error(`[CONTROLLER] error get flower by id: ${error}`, refId);
      throw new HttpException(
        'Failed to get flower by id',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @RefId() refId: string) {
    this.logger.info(`[CONTROLLER] delete flower id: ${id}`, refId);
    try {
      const result = await this.flowerService.delete(id, refId);
      this.logger.debug('[CONTROLLER] success delete flower', refId);
      return result;
    } catch (error) {
      this.logger.error(`[CONTROLLER] error delete flower: ${error}`, refId);
      throw new HttpException(
        'Failed to delete flower',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('category/:category')
  async getByCategory(
    @Param('category') category: string,
    @RefId() refId: string,
  ) {
    this.logger.info(
      `[CONTROLLER] get flowers by category: ${category}`,
      refId,
    );
    try {
      const result = await this.flowerService.getByCategory(category, refId);
      return result;
    } catch (error) {
      this.logger.error(
        `[CONTROLLER] error get flowers by category: ${error}`,
        refId,
      );
      throw new HttpException(
        'Failed to get flowers by category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
