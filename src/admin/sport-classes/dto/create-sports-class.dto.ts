import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSportsClassDto {
  @ApiProperty({ example: 1, description: 'Sport ID' })
  @IsNumber()
  sportId: number;

  @ApiProperty({ example: '1h30m', description: 'Duration of the class' })
  @IsString()
  duration: string;

  @ApiProperty({ example: 'Beginner-friendly basketball class' })
  @IsString()
  description: string;
}
