import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) readonly userRepo: Repository<User>) {}

  findAll() {
    return this.userRepo.find();
  }

  create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }
}
