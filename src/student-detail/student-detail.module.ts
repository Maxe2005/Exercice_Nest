import { Module } from '@nestjs/common';
import { User } from '../user/model/user.entity';
import { StudentDetail } from './model/student-detail.entity';
import { StudentDetailController } from './student-detail.controller';
import { StudentDetailService } from './student-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentDetail, User])],
  controllers: [StudentDetailController],
  providers: [StudentDetailService],
})
export class StudentDetailModule {}
