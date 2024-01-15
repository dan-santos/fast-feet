import { Module } from '@nestjs/common';
import { RecipientsController } from './controllers/recipients.controller';
import { OrdersController } from './controllers/orders.controller';
import { DatabaseModule } from '../database/database.module';
import { MessagesModule } from '../messages/messages.module';
import { EnvModule } from '@env/env.module';
import { CreateUseCase } from '@use-cases/create.use-case';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';
import { ReturnOrderEvent } from '@events/return-order.event';
import { CreateOrderEvent } from '@events/create-order.event';

@Module({
  controllers: [
    RecipientsController,
    OrdersController
  ],
  providers: [
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    FindByIdUseCase,
    FindManyUseCase,
    ReturnOrderEvent,
    CreateOrderEvent
  ],
  imports: [
    DatabaseModule,
    MessagesModule,
    EnvModule
  ]
})
export class HttpModule {}
