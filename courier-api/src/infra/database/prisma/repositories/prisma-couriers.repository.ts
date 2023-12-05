import { Courier } from 'src/domain/couriers/entities/courier.entity';
import { ICouriersRepository } from 'src/domain/couriers/repositories/couriers.repository'

export class PrismaCouriersRepository implements ICouriersRepository {
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