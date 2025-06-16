import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { CrudService } from '../crud/crud.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CrudService, Repository, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService, Repository, JwtAuthGuard],
})
export class UserModule {}
