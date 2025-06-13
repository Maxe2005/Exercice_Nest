import { Module } from '@nestjs/common';
import { User } from '../user/model/user.entity';
import { BankDetail } from './model/bank-detail.entity';
import { BankDetailController } from './bank-detail.controller';
import { BankDetailService } from './bank-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BankDetail, User])],
  controllers: [BankDetailController],
  providers: [BankDetailService],
})
export class BankDetailModule {}
