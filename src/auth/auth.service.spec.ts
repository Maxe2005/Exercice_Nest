import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: { findOneByEmail: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    userService = {
      findOneByEmail: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return safe user if credentials are valid', async () => {
      const password = await bcrypt.hash('testpass', 10);
      const user = {
        id: 1,
        email: 'a@a.com',
        password,
        name: 'A',
        role: ['USER'],
      };
      userService.findOneByEmail.mockResolvedValue(user);

      const result = await service.validateUser('a@a.com', 'testpass');
      expect(result).toMatchObject({
        id: 1,
        email: 'a@a.com',
        name: 'A',
        role: ['USER'],
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findOneByEmail.mockResolvedValue(null);
      await expect(
        service.validateUser('notfound@a.com', 'pass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const password = await bcrypt.hash('testpass', 10);
      const user = {
        id: 1,
        email: 'a@a.com',
        password,
        name: 'A',
        role: ['USER'],
      };
      userService.findOneByEmail.mockResolvedValue(user);

      await expect(
        service.validateUser('a@a.com', 'wrongpass'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return access_token', async () => {
      const user = { id: 1, email: 'a@a.com', role: ['USER'] };
      jwtService.sign.mockReturnValue('signed-token');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await service.login(user as any);
      expect(result).toEqual({ access_token: 'signed-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user.id,
        role: user.role,
      });
    });
  });
});
