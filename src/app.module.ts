import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from 'src/typeorm.config';
import { BankDetailModule } from './bank-detail/bank-detail.module';
import { StudentDetailModule } from './student-detail/student-detail.module';
import { ConfigModule } from '@nestjs/config';

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
})
export class AppModule {}
