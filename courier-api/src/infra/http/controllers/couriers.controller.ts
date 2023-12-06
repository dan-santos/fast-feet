import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCourierDto } from '@dto/create-courier.dto';
import { UpdateCourierDto } from '@dto/update-courier.dto';
import { CreateUseCase } from '@use-cases/create.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';

@Controller('couriers')
export class CouriersController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly findManyUseCase: FindManyUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  @Post()
  async create(@Body() createCourierDto: CreateCourierDto) {
    return await this.createUseCase.execute(createCourierDto);
  }

  @Get()
  async findAll(
    @Param('take') take?: number,
    @Param('skip') skip?: number
  ) {
    const { couriers } = await this.findManyUseCase.execute({ take, skip });
    return couriers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { courier } = await this.findByIdUseCase.execute(id);
    return courier;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return await this.updateUseCase.execute(updateCourierDto, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
