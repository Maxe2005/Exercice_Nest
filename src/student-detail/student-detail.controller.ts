import { Controller, Post, Body } from '@nestjs/common';
import { StudentDetailService } from './student-detail.service';
import { CreateStudentDetailDto } from './dto/create_student-detail.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('student-detail')
@Controller('student-detail')
export class StudentDetailController {
  constructor(private readonly studentDetailService: StudentDetailService) {}

  @Post()
  @ApiOperation({ summary: "Créer un nouveau détail d'étudiant" })
  @ApiResponse({ status: 201, description: "Détail d'étudiant créé" })
  create(@Body() createStudentDetailDto: CreateStudentDetailDto) {
    return this.studentDetailService.createStudentDetail(
      createStudentDetailDto,
    );
  }
}
