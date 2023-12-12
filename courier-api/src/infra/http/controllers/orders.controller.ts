import { Controller, Patch, Param, Query } from '@nestjs/common';
import { CollectOrderUseCase } from '@use-cases/collect-order.use-case';
import { DeliverOrderUseCase } from '@use-cases/deliver-order.use-case';

@Controller('couriers')
export class OrdersController {
  constructor(
    private readonly collectUseCase: CollectOrderUseCase,
    private readonly deliverUseCase: DeliverOrderUseCase,
  ) {}

  @Patch(':id/collect')
  async collectOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.collectUseCase.execute({ courierId: id, orderId });
  }

  @Patch(':id/deliver')
  async deliverOrder(
    @Param('id') id: string, 
    @Query('orderId') orderId: string
  ){
    return await this.deliverUseCase.execute({ courierId: id, orderId });
  }
}
