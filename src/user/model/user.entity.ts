import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StudentDetail } from '../../student-detail/model/student-detail.entity';
import { BankDetail } from '../../bank-detail/model/bank-detail.entity';
import { Role } from '../../auth/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'Le PNJ' })
  firstname: string;

  @Column()
  @Exclude() // 👈 ne sera pas retourné lors de la transformation
  password: string;

  @Column()
  email: string;

  @Column('text', { array: true, default: ['USER'] })
  role: Role[];

  @OneToOne(() => StudentDetail, (detail) => detail.user)
  studentDetail: StudentDetail;

  @ManyToMany(() => BankDetail, (bank) => bank.users)
  @JoinTable() // ← pour dire que c'est ici que la table d'association est créée
  bankDetails: BankDetail[];
}
