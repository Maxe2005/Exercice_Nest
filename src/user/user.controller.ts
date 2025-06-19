import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@ApiTags('users')
//@Public()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
  })
  findAll(@Query('test') test: string): Promise<User[]> {
    console.log('Ceci est un test : ' + test);
    return this.userService.findAll();
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Utilisateur créé' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN_IANORD)
  @Get('email/:email')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur récupéré avec succès',
  })
  async findOneEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findOneByEmail(email);
  }

  @Roles(Role.GESTIONNAIRE)
  @Get('id/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur récupéré avec succès',
  })
  async findOneId(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOneById(id);
  }

  @Roles(Role.USER, Role.GESTIONNAIRE)
  @Get('name/:nom')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son nom' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur récupéré avec succès',
  })
  async findOneName(@Param('nom') nom: string): Promise<User | null> {
    return this.userService.findOneByName(nom);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur mis à jour avec succès',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(+id, updateDto);
  }

  @Public()
  @Get('paginate')
  //@ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Paginer les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste paginée des utilisateurs récupérée avec succès',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Paramètres de pagination invalides',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Aucun utilisateur trouvé',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erreur interne du serveur',
  })
  async paginateUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.paginateUsers(+page, +limit);
  }

  @Public()
  @Get('full')
  async getUsersWithRelations() {
    return this.userService.getUsersWithRelations();
  }
}
