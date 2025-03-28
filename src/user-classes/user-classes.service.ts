import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsClass } from '../entities/sports-class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(SportsClass)
    private readonly sportsClassRepository: Repository<SportsClass>,
  ) {}

  async findAllFiltered(sports?: string): Promise<SportsClass[]> {
    const query = this.sportsClassRepository
      .createQueryBuilder('sc')
      .leftJoinAndSelect('sc.sport', 'sport');

    if (sports) {
      // Split the comma-separated list and trim whitespace
      const sportNames = sports.split(',').map((name) => name.trim());
      query.where('sport.name IN (:...sportNames)', { sportNames });
    }

    return await query.getMany();
  }
}
