import { PaginationParams } from 'src/core/pagination-params';
import { Courier } from 'src/domain/couriers/entities/courier.entity';
import { ICouriersRepository } from 'src/domain/couriers/repositories/couriers.repository';

export class InMemoryCouriersRepository implements ICouriersRepository {
  public items: Courier[] = [];

  async create(courier: Courier): Promise<void> {
    this.items.push(courier);
  }

  async save(courier: Courier): Promise<void> {
    const courierIndex = this.items.findIndex(c => c.id.equals(courier.id));
    
    this.items[courierIndex] = courier;
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

  async delete(id: string): Promise<void> {
    const courierIndex = this.items.findIndex(c => c.id.toString() === id);
    if (courierIndex !== -1) {
      this.items.splice(courierIndex, 1);
    }
  }
  
  async findMany(params: PaginationParams): Promise<Courier[]> {
    const { take, skip } = params;

    const couriers = this.items.slice(skip, take + skip);

    return couriers;
  }
}