import { Test, TestingModule } from '@nestjs/testing';
import { BankDetailController } from './bank-detail.controller';
import { BankDetailService } from './bank-detail.service';
import { CreateBankDetailDto } from './dto/create_bank-detail.dto';

describe('BankDetailController', () => {
  let controller: BankDetailController;
  let service: BankDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankDetailController],
      providers: [
        {
          provide: BankDetailService,
          useValue: {
            createBankDetail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BankDetailController>(BankDetailController);
    service = module.get<BankDetailService>(BankDetailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createBankDetail and return result', async () => {
      const dto: CreateBankDetailDto = {
        bankName: 'Test Bank',
        accountNumber: '123456',
        userIds: [1, 2],
      };
      const result = { id: 1, ...dto, users: [] };
      (service.createBankDetail as jest.Mock).mockResolvedValue(result);

      const response = await controller.create(dto);

      expect(service.createBankDetail).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });
});
