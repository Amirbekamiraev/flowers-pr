import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { FlowerEntity } from './entities/flower.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        process.env.DB_HOST ||
        'dpg-cvndckodl3ps73akoceg-a.frankfurt-postgres.render.com',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'tz_intern_unyp_user',
      password: process.env.DB_PASSWORD || 'TK1Zy633k0h0KFwDuMzRse3D9kM6pw50',
      database: process.env.DB_NAME || 'tz_intern_unyp',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, RoleEntity, FlowerEntity],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
