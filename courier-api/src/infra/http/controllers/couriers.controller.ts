import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCourierDto } from '../../../domain/couriers/dto/create-courier.dto';
import { UpdateCourierDto } from '../../../domain/couriers/dto/update-courier.dto';
import { CreateUseCase } from '../../../domain/couriers/use-cases/create.use-case';
import { FindManyUseCase } from 'src/domain/couriers/use-cases/find-many.use-case';
import { FindByEmailUseCase } from 'src/domain/couriers/use-cases/find-by-email.use-case';
import { UpdateUseCase } from 'src/domain/couriers/use-cases/update.use-case';
import { DeleteUseCase } from 'src/domain/couriers/use-cases/delete.use-case';

@Controller('couriers')
export class CouriersController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly findManyUseCase: FindManyUseCase,
    private readonly findByEmail: FindByEmailUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  @Post()
  async create(@Body() createCourierDto: CreateCourierDto) {
    return await this.createUseCase.execute(createCourierDto);
  }

  @Get()
  async findAll() {
    const { couriers } = await this.findManyUseCase.execute();
    return couriers;
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const { courier } = await this.findByEmail.execute(email);
    return courier;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return await this.updateUseCase.execute(id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
