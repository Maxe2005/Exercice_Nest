import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

@Injectable()
export class CrudService<T> {
  constructor(
    @InjectRepository(T)
    private readonly repository: Repository<T>,
  ) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(id: number, options?: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne({ where: { id }, ...options });
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
