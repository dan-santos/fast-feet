import { Courier } from '../entities/courier.entity';

export abstract class ICouriersRepository {
  abstract create(courier: Courier): Promise<void>;
  abstract findById(courierId: string): Promise<Courier | null>;
  abstract findByEmail(courierEmail: string): Promise<Courier | null>;
}