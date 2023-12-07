import { PaginationParams } from '@core/pagination-params';
import { Courier } from '@entities/courier.entity';

export abstract class ICouriersRepository {
  abstract create(courier: Courier): Promise<void>;
  abstract save(courier: Courier): Promise<void>;
  abstract findById(courierId: string): Promise<Courier | null>;
  abstract findByEmail(courierEmail: string): Promise<Courier | null>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(params: PaginationParams): Promise<Courier[]>;
}