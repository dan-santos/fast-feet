import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCourierDto } from '../../../domain/couriers/dto/create-courier.dto';
import { UpdateCourierDto } from '../../../domain/couriers/dto/update-courier.dto';
import { CreateUseCase } from '../../../domain/couriers/use-cases/create.use-case';

@Controller('couriers')
export class CouriersController {
  constructor(private readonly createUseCase: CreateUseCase) {}

  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.createUseCase.execute(createCourierDto);
  }

  // @Get()
  // findAll() {
  //   return this.couriersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.couriersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
  //   return this.couriersService.update(+id, updateCourierDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couriersService.remove(+id);
  // }
}
