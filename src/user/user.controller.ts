import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//import { RolesGuard } from '../auth/guards/roles.guard';
//import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //@Roles('ADMIN_IANORD')
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès',
  })
  async findOne(@Param('email') email: string): Promise<User | null> {
    return this.userService.findOneByEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(+id, updateDto);
  }
}
