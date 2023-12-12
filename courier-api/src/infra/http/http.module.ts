import { Module } from '@nestjs/common';
import { CouriersController } from './controllers/couriers.controller';
import { OrdersController } from './controllers/orders.controller';
import { DatabaseModule } from '../database/database.module';
import { MessagesModule } from '../messages/messages.module';
import { CreateUseCase } from '@use-cases/create.use-case';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';
import { DeliverOrderUseCase } from '@use-cases/deliver-order.use-case';
import { CollectOrderUseCase } from '@use-cases/collect-order.use-case';
import { EnvModule } from '@env/env.module';

@Module({
  controllers: [
    CouriersController,
    OrdersController
  ],
  providers: [
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    FindByIdUseCase,
    FindManyUseCase,
    DeliverOrderUseCase,
    CollectOrderUseCase
  ],
  imports: [
    DatabaseModule,
    MessagesModule,
    EnvModule
  ]
})
export class HttpModule {}