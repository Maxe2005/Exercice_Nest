import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { ObjectLiteral } from 'typeorm';
import { BaseEntity } from 'src/base.entity';

@Controller()
export class BaseController<T extends ObjectLiteral & BaseEntity> {
  constructor(private readonly service: CrudService<T>) {}

  @Post()
  async create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOneBy({ where: { id: id as any } }, true);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
