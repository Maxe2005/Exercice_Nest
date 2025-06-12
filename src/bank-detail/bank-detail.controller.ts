import { Controller, Post, Body } from '@nestjs/common';
import { BankDetailService } from './bank-detail.service';
import { CreateBankDetailDto } from './dto/create_bank-detail.dto';

@Controller('bank-detail')
export class BankDetailController {
  constructor(private readonly bankDetailService: BankDetailService) {}

  @Post()
  creat(@Body() dto: CreateBankDetailDto) {
    return this.bankDetailService.createBankDetail(dto);
  }
}
