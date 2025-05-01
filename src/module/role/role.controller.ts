import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { CreateRoleDto } from './dto/role.dto';
import { RefId } from 'src/decorators/ref.decorator';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleRepository: RoleService,
    private readonly logger: CustomLogger,
  ) {}

  @Post('create')
  async createRole(@Body() dto: CreateRoleDto, @RefId() refId: string) {
    this.logger.info(`Creating role ${JSON.stringify(dto)}`, refId);
    try {
      const newRole = await this.roleRepository.createRole(dto, refId);
      return newRole;
    } catch (error) {
      this.logger.error(`Error creating role ${error}`, refId);
      throw error;
    }
  }
}
