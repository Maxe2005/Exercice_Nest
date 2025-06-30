import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update_user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { UserFilterDto } from './dto/user_filter.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Récupérer tous les utilisateurs (avec filtres optionnels)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: [User],
  })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: Number })
  async findAll(@Query() filterDto: UserFilterDto): Promise<User[]> {
    return this.userService.findAll(filterDto);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilisateur créé',
    type: User,
  })
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
    type: User,
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
    type: User,
  })
  async findOneId(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findOneById(id);
  }

  @Roles(Role.USER, Role.GESTIONNAIRE)
  @Get('name/:name')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son nom' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur récupéré avec succès',
    type: User,
  })
  async findOneName(@Param('name') name: string): Promise<User | null> {
    return this.userService.findOneByName(name);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur mis à jour avec succès',
    type: User,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateDto);
  }

  @Public()
  @Get('paginate')
  @ApiOperation({ summary: 'Paginer les utilisateurs avec filtres' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste paginée des utilisateurs récupérée avec succès',
  })
  async paginateUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query() filterDto: UserFilterDto,
  ) {
    return this.userService.paginate(filterDto, page, limit);
  }

  @Public()
  @Get('full')
  @ApiOperation({
    summary: 'Récupérer tous les utilisateurs avec leurs relations',
  })
  @ApiQuery({
    name: 'relations',
    required: false,
    type: [String],
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs avec relations',
    type: [User],
  })
  async getUsersWithRelations(@Query('relations') relations?: string[]) {
    return this.userService.findAllWithRelations(relations);
  }
}
