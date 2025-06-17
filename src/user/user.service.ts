import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) readonly userRepo: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
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
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepo.update(user.id, updateUserDto);
    return await this.userRepo.findOne({ where: { id: user.id } });
  }
}
