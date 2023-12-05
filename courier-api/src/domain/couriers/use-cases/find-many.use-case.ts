import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { PaginationParams } from 'src/core/pagination-params';

interface FindManyUseCaseResponse {
  couriers: Courier[]
}

@Injectable()
export class FindManyUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(params?: PaginationParams): Promise<FindManyUseCaseResponse> {
    const couriers = await this.couriersRepository.findMany({ 
      take: params?.take || 10,
      skip: params?.skip || 0
    });

    return { couriers };
  }
}
