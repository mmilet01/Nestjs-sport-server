import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSession } from '../../entities/class-session.entity';
import { SportsClass } from '../../entities/sports-class.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class AdminSessionsService {
  constructor(
    @InjectRepository(ClassSession)
    private readonly sessionRepository: Repository<ClassSession>,

    @InjectRepository(SportsClass)
    private readonly sportsClassRepository: Repository<SportsClass>,
  ) {}

  async create(dto: CreateSessionDto): Promise<ClassSession> {
    const sportsClass = await this.sportsClassRepository.findOne({
      where: { id: dto.sportsClassId },
    });
    if (!sportsClass) {
      throw new NotFoundException(
        `Sports class with id ${dto.sportsClassId} not found`,
      );
    }

    const newSession = this.sessionRepository.create({
      sportsClass,
      sessionDate: new Date(dto.sessionDate),
      freeSpots: dto.freeSpots,
    });

    return await this.sessionRepository.save(newSession);
  }

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

  async update(id: number, dto: UpdateSessionDto): Promise<ClassSession> {
    const session = await this.findOne(id);

    // If the DTO includes a new sportsClassId, update that relationship.
    if (dto.sportsClassId) {
      const sportsClass = await this.sportsClassRepository.findOne({
        where: { id: dto.sportsClassId },
      });
      if (!sportsClass) {
        throw new NotFoundException(
          `Sports class with id ${dto.sportsClassId} not found`,
        );
      }
      session.sportsClass = sportsClass;
    }

    if (dto.sessionDate) {
      session.sessionDate = new Date(dto.sessionDate);
    }

    return await this.sessionRepository.save(session);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sessionRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return { message: `Session ${id} deleted successfully.` };
  }
}
