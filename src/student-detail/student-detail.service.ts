import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDetail } from './model/student-detail.entity';
import { User } from '../user/model/user.entity';
import { CreateStudentDetailDto } from './dto/create_student-detail.dto';

@Injectable()
export class StudentDetailService {
  constructor(
    @InjectRepository(StudentDetail)
    private readonly studentDetailRepo: Repository<StudentDetail>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createStudentDetail(
    createStudentDetailDto: CreateStudentDetailDto,
  ): Promise<StudentDetail> {
    const user = await this.userRepo.findOneBy({
      id: createStudentDetailDto.userId,
    });
    if (!user) throw new Error('User not found');

    const detail = this.studentDetailRepo.create({
      studentIdNumber: createStudentDetailDto.studentIdNumber,
      user,
    });

    return await this.studentDetailRepo.save(detail);
  }
}
