import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SportsClass } from './sports-class.entity';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. 'Basketball', 'Football', 'Jiu-jitsu'

  @OneToMany(() => SportsClass, (sportsClass) => sportsClass.sport)
  classes: SportsClass[];
}
