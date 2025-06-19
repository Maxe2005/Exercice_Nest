import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDetailDto } from './create_student-detail.dto';

export class UpdateStudentDetailDto extends PartialType(
  CreateStudentDetailDto,
) {}
