import { Injectable } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
} from 'typeorm';
//import { BaseEntity } from 'src/base.entity';

@Injectable()
export class CrudService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOneBy(options: FindOneOptions<T>, isError: boolean): Promise<T | null> {
    const user = await this.repository.findOne({
      where: options.where,
    });
    if (!user) {
      if (isError) {
        throw new Error('User not found');
      }
      return null;
    }
    return user;
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T | null> {
    const user = await this.findOneBy({ where: { id: id as any } }, true);
    if (!user) {
      throw new Error('User not found');
    }
    await this.repository.update(id, updateDto as any);
    return this.findOneBy({ where: { id: id as any } }, false);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
