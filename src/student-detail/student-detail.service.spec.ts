import { Test, TestingModule } from '@nestjs/testing';
import { StudentDetailService } from './student-detail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentDetail } from './model/student-detail.entity';
import { User } from '../user/model/user.entity';

describe('StudentDetailService', () => {
  let service: StudentDetailService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let studentDetailRepo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userRepo: any;

  beforeEach(async () => {
    studentDetailRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };
    userRepo = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentDetailService,
        {
          provide: getRepositoryToken(StudentDetail),
          useValue: studentDetailRepo,
        },
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get<StudentDetailService>(StudentDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStudentDetail', () => {
    it('should throw if user not found', async () => {
      userRepo.findOneBy.mockResolvedValue(null);
      await expect(
        service.createStudentDetail({
          studentIdNumber: 'S123',
          userId: 1,
        }),
      ).rejects.toThrow('User not found');
    });

    it('should create and save student detail', async () => {
      const user = { id: 1 };
      userRepo.findOneBy.mockResolvedValue(user);
      const created = { studentIdNumber: 'S123', user };
      studentDetailRepo.create.mockReturnValue(created);
      studentDetailRepo.save.mockResolvedValue({ id: 1, ...created });

      const result = await service.createStudentDetail({
        studentIdNumber: 'S123',
        userId: 1,
      });

      expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(studentDetailRepo.create).toHaveBeenCalledWith({
        studentIdNumber: 'S123',
        user,
      });
      expect(studentDetailRepo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual({ id: 1, ...created });
    });
  });
});
