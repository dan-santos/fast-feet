import { Module } from '@nestjs/common';
import { CouriersController } from './controllers/couriers.controller';
import { CreateUseCase } from '@use-cases/create.use-case';
import { DatabaseModule } from '../database/database.module';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';

@Module({
  controllers: [
    CouriersController
  ],
  providers: [
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    FindByIdUseCase,
    FindManyUseCase
  ],
  imports: [
    DatabaseModule
  ]
})
export class HttpModule {}