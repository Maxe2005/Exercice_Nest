import { Controller, Post, Body } from '@nestjs/common';
import { BankDetailService } from './bank-detail.service';
import { CreateBankDetailDto } from './dto/create_bank-detail.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('bank-detail')
@Controller('bank-detail')
export class BankDetailController {
  constructor(private readonly bankDetailService: BankDetailService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouveau détail bancaire' })
  @ApiResponse({ status: 201, description: 'Détail bancaire créé' })
  create(@Body() createBankDetailDto: CreateBankDetailDto) {
    return this.bankDetailService.createBankDetail(createBankDetailDto);
  }
}
