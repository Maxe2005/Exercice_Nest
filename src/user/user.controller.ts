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
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//import { RolesGuard } from '../auth/guards/roles.guard';
//import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Public()
  @ApiBearerAuth('access-token')
  @Get()
  //@Roles('ADMIN_IANORD')
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

  @Get(':email')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur récupéré avec succès',
  })
  async findOne(@Param('email') email: string): Promise<User | null> {
    return this.userService.findOneByEmail(email);
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
}
