import { Module } from '@nestjs/common';
import { CouriersController } from './controllers/couriers.controller';
import { CreateUseCase } from 'src/domain/couriers/use-cases/create.use-case';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [
    CouriersController
  ],
  providers: [
    CreateUseCase
  ],
  imports: [
    DatabaseModule
  ]
})
export class HttpModule {}