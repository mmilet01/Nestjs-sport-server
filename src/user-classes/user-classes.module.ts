import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsClass } from '../entities/sports-class.entity';
import { Sport } from '../entities/sport.entity';
import { ClassesController } from './user-classes.controller';
import { ClassesService } from './user-classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SportsClass, Sport])],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
