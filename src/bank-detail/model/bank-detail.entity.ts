import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity()
export class BankDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @ManyToMany(() => User, (user) => user.bankDetails)
  users: User[];
}
