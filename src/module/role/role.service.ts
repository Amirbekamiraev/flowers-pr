import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../database/entities/role.entity';
import { Repository } from 'typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly logger: CustomLogger,
  ) {}

  async createRole(dto: CreateRoleDto, refId: string): Promise<RoleEntity> {
    this.logger.info(`Creating role ${dto}`, refId);
    try {
      const newRole = this.roleRepository.create({
        role: dto.role,
        description: dto.description,
      });

      return await this.roleRepository.save(newRole);
    } catch (error) {
      this.logger.error(`Error creating role ${error}`, refId);
      throw error;
    }
  }

  async getAllRoles(refId: string): Promise<RoleEntity[]> {
    this.logger.info('Fetching all roles', refId);
    try {
      return await this.roleRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching roles ${error}`, refId);
      throw error;
    }
  }
  async getRoleById(id: number, refId: string): Promise<RoleEntity> {
    this.logger.info(`Fetching role with id ${id}`, refId);
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (!role) {
        throw new Error('Role not found');
      }
      return role;
    } catch (error) {
      this.logger.error(`Error fetching role ${error}`, refId);
      throw error;
    }
  }

  async getRoleByName(role: string, refId: string): Promise<RoleEntity> {
    this.logger.info(`Fetching role with name ${role}`, refId);
    try {
      const roleEntity = await this.roleRepository.findOneBy({ role });
      if (!roleEntity) {
        throw new Error('Role not found');
      }
      return roleEntity;
    } catch (error) {
      this.logger.error(`Error fetching role ${error}`, refId);
      throw error;
    }
  }
}
