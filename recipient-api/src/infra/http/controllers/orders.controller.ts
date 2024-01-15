import { Controller, Patch, Param, Query, Post } from '@nestjs/common';
import { CreateOrderEvent } from '@events/create-order.event';
import { ReturnOrderEvent } from '@events/return-order.event';

@Controller('recipients/:id/orders')
export class OrdersController {
  constructor(
    private readonly createEvent: CreateOrderEvent,
    private readonly returnEvent: ReturnOrderEvent,
  ) {}

  @Post('create')
  async createOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.createEvent.execute({ recipientId: id, orderId });
  }

  @Patch('return')
  async returnOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.returnEvent.execute({ recipientId: id, orderId });
  }
}
