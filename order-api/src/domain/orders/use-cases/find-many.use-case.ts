import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '@repositories/orders.repository';
import { Order } from '@entities/order.entity';
import { PaginationParams } from 'src/core/pagination-params';

interface FindManyUseCaseResponse {
  orders: Order[]
}

@Injectable()
export class FindManyUseCase {
  constructor(
    private ordersRepository: IOrdersRepository
  ){}

  async execute(params?: PaginationParams): Promise<FindManyUseCaseResponse> {
    const orders = await this.ordersRepository.findMany({ 
      take: params?.take || 10,
      skip: params?.skip || 0
    });

    return { orders };
  }
}
