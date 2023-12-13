import { PaginationParams } from 'src/core/pagination-params';
import { Courier } from 'src/domain/couriers/entities/courier.entity';
import { ICouriersRepository } from 'src/domain/couriers/repositories/couriers.repository';

export class PrismaCouriersRepository implements ICouriersRepository {
  save(courier: Courier): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findMany(params: PaginationParams): Promise<Courier[]> {
    throw new Error('Method not implemented.');
  }
  create(courier: Courier): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(courierId: string): Promise<Courier> {
    throw new Error('Method not implemented.');
  }
  findByEmail(courierEmail: string): Promise<Courier> {
    throw new Error('Method not implemented.');
  }
}