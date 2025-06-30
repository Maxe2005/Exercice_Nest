import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { login: jest.Mock };

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return access_token from AuthService', async () => {
      const req = { user: { id: 1, email: 'a@a.com', role: ['USER'] } };
      authService.login.mockResolvedValue({ access_token: 'token' });
      const result = await controller.login(req);
      expect(authService.login).toHaveBeenCalledWith(req.user);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('getProfile', () => {
    it('should return the user from request', () => {
      const req = { user: { id: 1, email: 'a@a.com', role: ['USER'] } };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});
