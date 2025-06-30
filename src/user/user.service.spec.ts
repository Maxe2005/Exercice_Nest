import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
  } as User;

  const mockUserArray = [mockUser];

  const mockRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  describe('findOneByEmail', () => {
    it('doit retourner un utilisateur par email', async () => {
      mockRepo.findOne.mockResolvedValue(mockUser);
      const result = await service.findOneByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('findOneById', () => {
    it('doit retourner un utilisateur par id', async () => {
      mockRepo.findOne.mockResolvedValue(mockUser);
      const result = await service.findOneById(1);
      expect(result).toEqual(mockUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findOneByName', () => {
    it('doit retourner un utilisateur par nom', async () => {
      mockRepo.findOne.mockResolvedValue(mockUser);
      const result = await service.findOneByName('Test User');
      expect(result).toEqual(mockUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { name: 'Test User' },
      });
    });
  });

  describe('findAll', () => {
    it('doit retourner tous les utilisateurs', async () => {
      mockRepo.find.mockResolvedValue(mockUserArray);
      const result = await service.findAll();
      expect(result).toEqual(mockUserArray);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('doit créer un utilisateur avec mot de passe hashé', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'plainPassword',
      } as CreateUserDto;

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockRepo.create.mockReturnValue({ ...dto, password: 'hashedPassword' });
      mockRepo.save.mockResolvedValue(mockUser);

      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashedPassword',
      });
      expect(mockRepo.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('doit mettre à jour un utilisateur existant', async () => {
      const dto: UpdateUserDto = { name: 'Updated Name' } as UpdateUserDto;
      mockRepo.findOne.mockResolvedValueOnce(mockUser); // pour vérifier l'existence
      mockRepo.update.mockResolvedValue(undefined);
      mockRepo.findOne.mockResolvedValueOnce({ ...mockUser, ...dto });

      const result = await service.update(1, dto);

      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ ...mockUser, ...dto });
    });

    it('doit lancer une erreur si utilisateur non trouvé', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.update(1, {} as UpdateUserDto)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('paginateUsers', () => {
    it('doit retourner les utilisateurs paginés', async () => {
      mockRepo.findAndCount.mockResolvedValue([[mockUser], 1]);
      const result = await service.paginateUsers(1, 10);
      expect(mockRepo.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        data: [mockUser],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe('getUsersWithRelations', () => {
    it('doit retourner les utilisateurs avec leurs relations', async () => {
      mockRepo.find.mockResolvedValue([mockUser]);
      const result = await service.getUsersWithRelations();
      expect(mockRepo.find).toHaveBeenCalledWith({
        relations: ['studentDetail', 'bankDetails'],
      });
      expect(result).toEqual([mockUser]);
    });
  });
});
