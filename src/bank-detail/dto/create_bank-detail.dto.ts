import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDetailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly bankName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly accountNumber: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  readonly userIds: number[];
}
