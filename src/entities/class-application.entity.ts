import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ClassSession } from './class-session.entity';

@Entity()
export class ClassApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ClassSession, (session) => session.applications, {
    onDelete: 'CASCADE',
  })
  classSession: ClassSession;

  @CreateDateColumn()
  appliedAt: Date;
}
