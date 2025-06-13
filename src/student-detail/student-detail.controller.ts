import { Controller, Post, Body } from '@nestjs/common';
import { StudentDetailService } from './student-detail.service';
import { CreateStudentDetailDto } from './dto/create_student-detail.dto';

@Controller('student-detail')
export class StudentDetailController {
  constructor(private readonly studentDetailService: StudentDetailService) {}

  @Post()
  create(@Body() dto: CreateStudentDetailDto) {
    return this.studentDetailService.createStudentDetail(dto);
  }
}
