import { Controller, Body, Post, HttpException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /*
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req: Request, @Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);
    if (!user) throw new HttpException('Invalid credentials', 401);
    return user;
  }*/
}
