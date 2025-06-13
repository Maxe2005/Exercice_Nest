import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity()
export class StudentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentIdNumber: string;

  @OneToOne(() => User)
  @JoinColumn() // ← très important pour savoir qui possède la relation
  user: User;
}
