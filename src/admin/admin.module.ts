import { Module } from '@nestjs/common';
import { SportsClass } from '../entities/sports-class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from '../entities/sport.entity';
import { AdminSportsController } from './sports/sports.controller';
import { AdminSportsService } from './sports/sports.service';
import { AdminClassesController } from './sport-classes/sport-classes.controller';
import { AdminClassesService } from './sport-classes/sport-classes.service';
import { AdminSessionsController } from './sessions/sessions.controller';
import { AdminSessionsService } from './sessions/sessions.service';
import { ClassSession } from '../entities/class-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sport, SportsClass, ClassSession])],
  controllers: [
    AdminSportsController,
    AdminClassesController,
    AdminSessionsController,
  ],
  providers: [AdminSportsService, AdminClassesService, AdminSessionsService],
})
export class AdminModule {}
