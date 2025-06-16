import { FindOptionsWhere } from 'typeorm';

export interface BaseEntity {
  id: number;
}

export type BaseEntityFindOptions<T extends BaseEntity> = {
  id: FindOptionsWhere<T['id']>;
};
