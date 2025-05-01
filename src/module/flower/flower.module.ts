import { Module } from '@nestjs/common';
import { FlowerService } from './flower.service';
import { FlowerController } from './flower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerEntity } from '../database/entities/flower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlowerEntity])],
  providers: [FlowerService],
  controllers: [FlowerController],
  exports: [FlowerService],
})
export class FlowerModule {}
