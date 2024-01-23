import { PaginationParams } from 'src/core/pagination-params';
import { Courier } from 'src/domain/couriers/entities/courier.entity';
import { ICouriersRepository } from 'src/domain/couriers/repositories/couriers.repository';
import { PrismaService } from '../prisma.service';
import { PrismaCourierMapper } from '../mappers/courier-mapper';

export class PrismaCouriersRepository implements ICouriersRepository {
  private prisma = new PrismaService();

  async save(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toDatabase(courier);
    
    await this.prisma.courier.update({ 
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.courier.delete({
      where: {
        id
      },
    });
  }

  async findMany(params: PaginationParams): Promise<Courier[]> {
    const couriers = await this.prisma.courier.findMany({
      take: params.take,
      skip: params.skip
    });

    return couriers.map(PrismaCourierMapper.toDomain);
  }

  async create(courier: Courier): Promise<void> {
    const data = PrismaCourierMapper.toDatabase(courier);

    await this.prisma.courier.create({ data });
  }

  async findById(courierId: string): Promise<Courier> {
    const courier = await this.prisma.courier.findUnique({
      where: {
        id: courierId,
      },
    });

    if (!courier) return null;

    return PrismaCourierMapper.toDomain(courier);
  }

  async findByEmail(courierEmail: string): Promise<Courier> {
    const courier = await this.prisma.courier.findUnique({
      where: {
        email: courierEmail,
      },
    });

    if (!courier) return null;

    return PrismaCourierMapper.toDomain(courier);
  }
}