// src/entities/class-session.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SportsClass } from './sports-class.entity';
import { ClassApplication } from './class-application.entity';

@Entity()
export class ClassSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SportsClass, (sportsClass) => sportsClass.sessions, {
    onDelete: 'CASCADE',
  })
  sportsClass: SportsClass;

  @Column('date')
  sessionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Track the free spots available for this session.
  @Column({ type: 'int', default: 0 })
  freeSpots: number;

  @OneToMany(() => ClassApplication, (application) => application.classSession)
  applications: ClassApplication[];
}
