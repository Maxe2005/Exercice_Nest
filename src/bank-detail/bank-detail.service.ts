import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDetail } from './model/bank-detail.entity';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.entity';
import { CreateBankDetailDto } from './dto/create_bank-detail.dto';

@Injectable()
export class BankDetailService {
  constructor(
    @InjectRepository(BankDetail)
    private readonly bankDetailRepo: Repository<BankDetail>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createBankDetail(dto: CreateBankDetailDto): Promise<BankDetail> {
    const users = await this.userRepo.findByIds(dto.userIds);
    if (users.length === 0) {
      throw new Error('Aucun utilisateur trouvé');
    }
    const bankDetail = this.bankDetailRepo.create({
      bankName: dto.bankName,
      accountNumber: dto.accountNumber,
      users,
    });
    return await this.bankDetailRepo.save(bankDetail);
  }
}
