import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowerEntity } from '../database/entities/flower.entity';
import { Repository } from 'typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { FlowerDto } from './dto/flower.dto';

@Injectable()
export class FlowerService {
  constructor(
    @InjectRepository(FlowerEntity)
    private flowerRespository: Repository<FlowerEntity>,
    private readonly logger: CustomLogger,
  ) {}

  async create(dto: FlowerDto, refId: string) {
    this.logger.info(`[START] create flower`, refId);
    try {
      this.logger.info(`[START] create flower`, refId);
      const flower = await this.flowerRespository.create({
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        category: dto.category.toLowerCase(),
        waterAmountMlPerDay: dto.waterAmountMlPerDay,
      });

      return await this.flowerRespository.save(flower);
    } catch (error) {
      this.logger.error(`[START] create flower ${JSON.stringify(dto)}`, refId);
      throw error;
    }
  }

  async getAll(refId: string) {
    this.logger.info(`[START] get all flowers`, refId);
    try {
      this.logger.debug(`[SUCCEES] get all flowers`, refId);
      const flowers = await this.flowerRespository.find();
      return flowers;
    } catch (error) {
      this.logger.error(
        `[ERROR] get all flowers ${JSON.stringify(error)}`,
        refId,
      );
      throw error;
    }
  }
  async getById(id: number, refId: string) {
    this.logger.info(`[START] get by id all flowers`, refId);
    try {
      this.logger.debug(`[SUCCEES] get by id all flowers`, refId);
      const flowers = await this.flowerRespository.findOne({ where: { id } });
      return flowers;
    } catch (error) {
      this.logger.error(
        `[ERROR] get by id all flowers ${JSON.stringify(error)}`,
        refId,
      );
      throw error;
    }
  }

  async delete(id: number, refId: string) {
    this.logger.info(`[START] delete flower`, refId);
    try {
      this.logger.debug(`[SUCCEES] delete flower`, refId);
      const flowers = await this.flowerRespository.delete(id);
      return flowers;
    } catch (error) {
      this.logger.error(
        `[ERROR] delete flower ${JSON.stringify(error)}`,
        refId,
      );
      throw error;
    }
  }
  async getByCategory(category: string, refId: string) {
    this.logger.info(`[START] get flowers by category: ${category}`, refId);
    try {
      const flowers = await this.flowerRespository.find({
        where: { category: category.toLowerCase() },
      });
      this.logger.debug(`[SUCCESS] get flowers by category`, refId);
      return flowers;
    } catch (error) {
      this.logger.error(
        `[ERROR] get flowers by category ${JSON.stringify(error)}`,
        refId,
      );
      throw error;
    }
  }
}
