import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRecipientDto } from '@dto/create-recipient.dto';
import { UpdateRecipientDto } from '@dto/update-recipient.dto';
import { CreateUseCase } from '@use-cases/create.use-case';
import { FindManyUseCase } from '@use-cases/find-many.use-case';
import { FindByIdUseCase } from '@use-cases/find-by-id.use-case';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { DeleteUseCase } from '@use-cases/delete.use-case';

@Controller('recipients')
export class RecipientsController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly findManyUseCase: FindManyUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {}

  @Post()
  async create(@Body() createRecipientDto: CreateRecipientDto) {
    return await this.createUseCase.execute(createRecipientDto);
  }

  @Get()
  async findAll(
    @Param('take') take?: number,
    @Param('skip') skip?: number
  ) {
    const { recipients } = await this.findManyUseCase.execute({ take, skip });
    return recipients;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { recipient } = await this.findByIdUseCase.execute(id);
    return recipient;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return await this.updateUseCase.execute(updateRecipientDto, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
