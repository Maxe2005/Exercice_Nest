import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from './model/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    // Ajoutez les autres propriétés nécessaires selon votre entité User
  } as User;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    create: jest.fn().mockResolvedValue(mockUser),
    findOneByEmail: jest.fn().mockResolvedValue(mockUser),
    findOneById: jest.fn().mockResolvedValue(mockUser),
    findOneByName: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    paginateUsers: jest
      .fn()
      .mockResolvedValue({ items: [mockUser], meta: { totalItems: 1 } }),
    getUsersWithRelations: jest.fn().mockResolvedValue([mockUser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('doit retourner tous les utilisateurs', async () => {
      const result = await controller.findAll('test');
      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('doit créer un utilisateur', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      } as CreateUserDto;
      const result = await controller.create(dto);
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOneEmail', () => {
    it('doit retourner un utilisateur par email', async () => {
      const result = await controller.findOneEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(service.findOneByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('findOneId', () => {
    it('doit retourner un utilisateur par id', async () => {
      const result = await controller.findOneId(1);
      expect(result).toEqual(mockUser);
      expect(service.findOneById).toHaveBeenCalledWith(1);
    });
  });

  describe('findOneName', () => {
    it('doit retourner un utilisateur par nom', async () => {
      const result = await controller.findOneName('Test User');
      expect(result).toEqual(mockUser);
      expect(service.findOneByName).toHaveBeenCalledWith('Test User');
    });
  });

  describe('update', () => {
    it('doit mettre à jour un utilisateur', async () => {
      const dto: UpdateUserDto = { name: 'Updated Name' } as UpdateUserDto;
      const result = await controller.update('1', dto);
      expect(result).toEqual(mockUser);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('paginateUsers', () => {
    it('doit retourner une liste paginée des utilisateurs', async () => {
      const result = await controller.paginateUsers(1, 10);
      expect(result).toEqual({ items: [mockUser], meta: { totalItems: 1 } });
      expect(service.paginateUsers).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('getUsersWithRelations', () => {
    it('doit retourner les utilisateurs avec leurs relations', async () => {
      const result = await controller.getUsersWithRelations();
      expect(result).toEqual([mockUser]);
      expect(service.getUsersWithRelations).toHaveBeenCalled();
    });
  });
});
