import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Nom complet de l’utilisateur',
    minLength: 3,
    maxLength: 50,
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Adresse email de l’utilisateur',
  })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '123456',
    description: 'Mot de passe (min 6 caractères)',
  })
  readonly password: string;

  @ApiProperty({
    example: 'GESTIONNAIRE',
    description: 'Rôle de l’utilisateur (par défaut : USER)',
  })
  readonly role: Role[] = [Role.USER];
}
