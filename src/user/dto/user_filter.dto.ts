import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserFilterDto {
  @ApiPropertyOptional({
    description: 'Récupère les utilisateurs selon leur id',
    type: [Number],
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  readonly id?: number;

  @ApiPropertyOptional({
    description: 'Récupère les utilisateurs selon leur nom',
    type: [String],
    example: ['John Doe'],
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Récupère les utilisateurs selon leur email',
    type: [String],
    example: ['user@example.com'],
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  readonly email?: string;
}
