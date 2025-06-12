import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateBankDetailDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
