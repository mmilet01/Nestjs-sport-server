import { IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ example: 1, description: 'ID of the associated sports class' })
  @IsNumber()
  sportsClassId: number;

  @ApiProperty({
    example: '2025-04-01',
    description: 'Date for the class session (ISO format)',
  })
  @IsDateString()
  sessionDate: string;

  @ApiProperty({ example: 20, description: 'Number of free spots available' })
  @IsNumber()
  freeSpots: number;
}
