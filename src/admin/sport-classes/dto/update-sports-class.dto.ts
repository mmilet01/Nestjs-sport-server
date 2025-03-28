import { PartialType } from '@nestjs/swagger';
import { CreateSportsClassDto } from './create-sports-class.dto';

export class UpdateSportsClassDto extends PartialType(CreateSportsClassDto) {}
