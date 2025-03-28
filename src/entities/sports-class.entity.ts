import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sport } from './sport.entity';
import { ClassSchedule } from './class-schedule.entity';
import { ClassSession } from './class-session.entity';

@Entity()
export class SportsClass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sport, (sport) => sport.classes, { onDelete: 'SET NULL' })
  sport: Sport;

  @Column()
  duration: string; // e.g., '1h30m' or have two date times - calendars itds

  @Column('text')
  description: string;

  // Link to the schedule entries for this recurring class
  @OneToMany(() => ClassSchedule, (schedule) => schedule.sportsClass)
  schedules: ClassSchedule[];

  // Link to the individual session instances
  @OneToMany(() => ClassSession, (session) => session.sportsClass)
  sessions: ClassSession[];
}
