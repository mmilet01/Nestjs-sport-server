import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSession } from '../entities/class-session.entity';
import { ClassApplication } from '../entities/class-application.entity';
import { UserSessionsController } from './user-sessions.controller';
import { UserSessionsService } from './user-sessions.service';

@Module({
  imports: [
    // We need repositories for ClassSession and ClassApplication
    TypeOrmModule.forFeature([ClassSession, ClassApplication]),
  ],
  controllers: [UserSessionsController],
  providers: [UserSessionsService],
  exports: [UserSessionsService],
})
export class UserSessionsModule {}
