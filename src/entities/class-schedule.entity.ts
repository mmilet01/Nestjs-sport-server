import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SportsClass } from './sports-class.entity';

@Entity()
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SportsClass, (sportsClass) => sportsClass.schedules, {
    onDelete: 'CASCADE',
  })
  sportsClass: SportsClass;

  @Column()
  dayOfWeek: string; // e.g., 'MON', 'WED', 'FRI'

  @Column('time')
  startTime: string; // e.g., '07:00:00'
}
