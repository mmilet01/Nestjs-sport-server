import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSession } from '../entities/class-session.entity';
import { ClassApplication } from '../entities/class-application.entity';
import { CreateApplicationDto } from './dto/create-user-application.dto';

@Injectable()
export class UserSessionsService {
  constructor(
    @InjectRepository(ClassSession)
    private readonly sessionRepository: Repository<ClassSession>,

    @InjectRepository(ClassApplication)
    private readonly applicationRepository: Repository<ClassApplication>,
  ) {}

  async findAll(): Promise<ClassSession[]> {
    return this.sessionRepository.find({ relations: ['sportsClass'] });
  }

  async findOne(id: number): Promise<ClassSession> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['sportsClass'],
    });
    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return session;
  }

  async apply(
    id: number,
    dto: CreateApplicationDto,
  ): Promise<ClassApplication> {
    const session = await this.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }

    if (session.freeSpots <= 0) {
      throw new BadRequestException(
        'No free spots available for this session.',
      );
    }

    const application = this.applicationRepository.create({
      user: { id: dto.userId } as any,
      classSession: session,
    });

    session.freeSpots -= 1;
    await this.sessionRepository.save(session);

    return this.applicationRepository.save(application);
  }

  async findAppliedSessions(userId: number) {
    return this.applicationRepository.find({
      where: { user: { id: userId } },
      relations: [
        'classSession',
        'classSession.sportsClass',
        'classSession.sportsClass.sport',
      ],
    });
  }

  async findSessionsBySport(sportId: number): Promise<ClassSession[]> {
    return this.sessionRepository.find({
      relations: ['sportsClass', 'sportsClass.sport'],
      where: {
        sportsClass: {
          sport: { id: sportId },
        },
      },
    });
  }
}
