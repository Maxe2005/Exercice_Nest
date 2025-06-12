import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStudentDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly studentIdNumber: string;

  @IsNumber()
  readonly userId: number;
}
