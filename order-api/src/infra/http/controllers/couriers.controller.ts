import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateOrderDto } from '@dto/create-order.dto';
import { UpdateOrderDto } from '@dto/update-order.dto';
import { CreateUseCase } from '@use-cases/create.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly findManyUseCase: FindManyUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.createUseCase.execute(createOrderDto);
  }

  @Get()
  async findAll(
    @Param('take') take?: number,
    @Param('skip') skip?: number
  ) {
    const { orders } = await this.findManyUseCase.execute({ take, skip });
    return orders;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { order } = await this.findByIdUseCase.execute(id);
    return order;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.updateUseCase.execute(updateOrderDto, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
