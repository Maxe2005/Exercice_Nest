import { Test, TestingModule } from '@nestjs/testing';
import { StudentDetailController } from './student-detail.controller';
import { StudentDetailService } from './student-detail.service';
import { CreateStudentDetailDto } from './dto/create_student-detail.dto';

describe('StudentDetailController', () => {
  let controller: StudentDetailController;
  let service: StudentDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentDetailController],
      providers: [
        {
          provide: StudentDetailService,
          useValue: {
            createStudentDetail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentDetailController>(StudentDetailController);
    service = module.get<StudentDetailService>(StudentDetailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createStudentDetail and return result', async () => {
      const dto: CreateStudentDetailDto = {
        studentIdNumber: 'S123',
        userId: 1,
      };
      const result = { id: 1, ...dto, user: {} };
      (service.createStudentDetail as jest.Mock).mockResolvedValue(result);

      const response = await controller.create(dto);

      expect(service.createStudentDetail).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });
});
