import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(@InjectRepository(User) readonly userRepo: Repository<User>) {
    super(userRepo);
  }
  /*
  findAll() {
    return this.userRepo.find();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }
    */
}
