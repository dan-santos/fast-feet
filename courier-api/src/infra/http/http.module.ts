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
import { DeliverOrderEvent } from '@events/deliver-order.event';
import { CollectOrderEvent } from '@events/collect-order.event';
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
    DeliverOrderEvent,
    CollectOrderEvent
  ],
  imports: [
    DatabaseModule,
    MessagesModule,
    EnvModule
  ]
})
export class HttpModule {}