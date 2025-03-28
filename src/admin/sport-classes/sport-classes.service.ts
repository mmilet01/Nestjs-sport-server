import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsClass } from '../../entities/sports-class.entity';
import { Sport } from '../../entities/sport.entity';
import { CreateSportsClassDto } from './dto/create-sports-class.dto';
import { UpdateSportsClassDto } from './dto/update-sports-class.dto';

@Injectable()
export class AdminClassesService {
  constructor(
    @InjectRepository(SportsClass)
    private readonly classesRepository: Repository<SportsClass>,

    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  async create(dto: CreateSportsClassDto): Promise<SportsClass> {
    const sport = await this.sportRepository.findOne({
      where: { id: dto.sportId },
    });
    if (!sport) {
      throw new NotFoundException(`Sport with id ${dto.sportId} not found.`);
    }

    const newClass = this.classesRepository.create({
      sport,
      duration: dto.duration,
      description: dto.description,
    });

    return await this.classesRepository.save(newClass);
  }

  async findAll(): Promise<SportsClass[]> {
    return this.classesRepository.find({ relations: ['sport'] });
  }

  async findOne(id: number): Promise<SportsClass> {
    const sportsClass = await this.classesRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
    if (!sportsClass) {
      throw new NotFoundException(`Sports class with id ${id} not found`);
    }
    return sportsClass;
  }

  async update(id: number, dto: UpdateSportsClassDto): Promise<SportsClass> {
    const sportsClass = await this.findOne(id);

    if (dto.sportId) {
      const newSport = await this.sportRepository.findOne({
        where: { id: dto.sportId },
      });
      if (!newSport) {
        throw new NotFoundException(`Sport with id ${dto.sportId} not found.`);
      }
      sportsClass.sport = newSport;
    }

    if (dto.duration !== undefined) {
      sportsClass.duration = dto.duration;
    }
    if (dto.description !== undefined) {
      sportsClass.description = dto.description;
    }

    return this.classesRepository.save(sportsClass);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.classesRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Sports class with id ${id} not found`);
    }
    return { message: `Sports class ${id} deleted successfully.` };
  }
}
