import { Controller, Patch, Param, Query } from '@nestjs/common';
import { CollectOrderEvent } from '@events/collect-order.event';
import { DeliverOrderEvent } from '@events/deliver-order.event';

@Controller('couriers')
export class OrdersController {
  constructor(
    private readonly collectEvent: CollectOrderEvent,
    private readonly deliverEvent: DeliverOrderEvent,
  ) {}

  @Patch(':id/collect')
  async collectOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.collectEvent.execute({ courierId: id, orderId });
  }

  @Patch(':id/deliver')
  async deliverOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.deliverEvent.execute({ courierId: id, orderId });
  }
}
