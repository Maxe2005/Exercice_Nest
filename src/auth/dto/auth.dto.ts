import { IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
