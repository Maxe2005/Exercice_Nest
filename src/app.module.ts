import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from 'src/typeorm.config';
import { BankDetailModule } from './bank-detail/bank-detail.module';
import { StudentDetailModule } from './student-detail/student-detail.module';
import { ConfigModule } from '@nestjs/config';
import { CrudService } from './crud/crud.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    BankDetailModule,
    StudentDetailModule,
    ConfigModule.forRoot({
      //ignoreEnvFile: true,
      isGlobal: true,
    }),
  ],
  providers: [CrudService],
})
export class AppModule {}
