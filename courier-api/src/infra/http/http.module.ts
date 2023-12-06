import { Module } from '@nestjs/common';
import { CouriersController } from './controllers/couriers.controller';
import { CreateUseCase } from 'src/domain/couriers/use-cases/create.use-case';
import { DatabaseModule } from '../database/database.module';
import { UpdateUseCase } from 'src/domain/couriers/use-cases/update.use-case';
import { DeleteUseCase } from 'src/domain/couriers/use-cases/delete.use-case';
import { FindByIdUseCase } from 'src/domain/couriers/use-cases/find-by-id.use-case';
import { FindManyUseCase } from 'src/domain/couriers/use-cases/find-many.use-case';

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