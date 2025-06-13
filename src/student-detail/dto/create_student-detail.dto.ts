import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDetailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly studentIdNumber: string;

  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
