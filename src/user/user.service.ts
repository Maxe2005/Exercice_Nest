import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import * as bcrypt from 'bcrypt';
import { UserFilterDto } from './dto/user_filter.dto'; // À créer si non existant

export interface FindUserOptions {
  select?: (keyof User)[];
  relations?: string[];
  skip?: number;
  take?: number;
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) readonly userRepo: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findOneByName(name: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { name: name } });
  }

  async findAll(
    filterDto?: UserFilterDto,
    options?: FindUserOptions,
  ): Promise<User[]> {
    const where = filterDto ? this.createUserFilterConditions(filterDto) : {};
    const findOptions: FindManyOptions<User> = {
      where,
      select: options?.select,
      relations: options?.relations,
      skip: options?.skip,
      take: options?.take,
    };
    return this.userRepo.find(findOptions);
  }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepo.update(user.id, updateUserDto);
    return await this.userRepo.findOne({ where: { id: user.id } });
  }

  async paginate(
    filterDto: UserFilterDto,
    page: number,
    limit: number,
    options?: FindUserOptions,
  ) {
    const where = this.createUserFilterConditions(filterDto);
    const [users, total] = await this.userRepo.findAndCount({
      where,
      select: options?.select,
      relations: options?.relations,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllWithRelations(relations: string[] = []) {
    return this.userRepo.find({ relations });
  }

  // Méthode privée pour construire les conditions de filtre
  private createUserFilterConditions(
    filterDto: UserFilterDto,
  ): FindOptionsWhere<User> {
    const where: FindOptionsWhere<User> = {};
    if (filterDto.email) where.email = filterDto.email;
    if (filterDto.name) where.name = filterDto.name;
    if (filterDto.id) where.id = filterDto.id;
    // Ajouter d'autres filtres selon UserFilterDto
    return where;
  }
}
