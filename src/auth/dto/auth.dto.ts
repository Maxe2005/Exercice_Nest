import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'alice@example.com',
    description: 'Email de l’utilisateur',
    minLength: 3,
    maxLength: 50,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'Mot de passe de l’utilisateur',
    minLength: 2,
    maxLength: 100,
  })
  readonly password: string;
}
