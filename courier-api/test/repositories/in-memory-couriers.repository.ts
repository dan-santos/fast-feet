import { Courier } from 'src/domain/couriers/entities/courier.entity';
import { ICouriersRepository } from 'src/domain/couriers/repositories/couriers.repository';

export class InMemoryCouriersRepository implements ICouriersRepository {
  public items: Courier[] = [];

  async create(courier: Courier): Promise<void> {
    this.items.push(courier);
  }

  async findById(courierId: string): Promise<Courier> {
    const courier = this.items.find(c => c.id.toString() === courierId);
    if (!courier) return null;
    return courier;
  }
  
  async findByEmail(courierEmail: string): Promise<Courier> {
    const courier = this.items.find(c => c.email === courierEmail);
    if (!courier) return null;
    return courier;
  }
  
}