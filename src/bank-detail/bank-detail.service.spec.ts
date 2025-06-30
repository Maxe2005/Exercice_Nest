import { Test, TestingModule } from '@nestjs/testing';
import { BankDetailService } from './bank-detail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BankDetail } from './model/bank-detail.entity';
import { User } from '../user/model/user.entity';

describe('BankDetailService', () => {
  let service: BankDetailService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bankDetailRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userRepo: any;

  beforeEach(async () => {
    bankDetailRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };
    userRepo = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankDetailService,
        { provide: getRepositoryToken(BankDetail), useValue: bankDetailRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get<BankDetailService>(BankDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBankDetail', () => {
    it('should throw if no users found', async () => {
      userRepo.findByIds.mockResolvedValue([]);
      await expect(
        service.createBankDetail({
          bankName: 'Bank',
          accountNumber: '123',
          userIds: [1],
        }),
      ).rejects.toThrow('Aucun utilisateur trouvé');
    });

    it('should create and save bank detail', async () => {
      const users = [{ id: 1 }];
      userRepo.findByIds.mockResolvedValue(users);
      const created = { bankName: 'Bank', accountNumber: '123', users };
      bankDetailRepo.create.mockReturnValue(created);
      bankDetailRepo.save.mockResolvedValue({ id: 1, ...created });

      const result = await service.createBankDetail({
        bankName: 'Bank',
        accountNumber: '123',
        userIds: [1],
      });

      expect(userRepo.findByIds).toHaveBeenCalledWith([1]);
      expect(bankDetailRepo.create).toHaveBeenCalledWith({
        bankName: 'Bank',
        accountNumber: '123',
        users,
      });
      expect(bankDetailRepo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual({ id: 1, ...created });
    });
  });
});
