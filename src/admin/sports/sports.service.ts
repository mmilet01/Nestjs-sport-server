import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from '../../entities/sport.entity';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Injectable()
export class AdminSportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  async create(dto: CreateSportDto): Promise<Sport> {
    // Check if a sport with this name already exists
    const existing = await this.sportRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new BadRequestException(`Sport '${dto.name}' already exists.`);
    }

    const sport = this.sportRepository.create(dto);
    return this.sportRepository.save(sport);
  }

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    const sport = await this.sportRepository.findOne({ where: { id } });
    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found.`);
    }
    return sport;
  }

  async update(id: number, dto: UpdateSportDto): Promise<Sport> {
    const sport = await this.findOne(id);

    // Merge new data into the existing entity
    Object.assign(sport, dto);
    return this.sportRepository.save(sport);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sportRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Sport with id ${id} not found.`);
    }
    return { message: `Sport ${id} deleted successfully.` };
  }
}
