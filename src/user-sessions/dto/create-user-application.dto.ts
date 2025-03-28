import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1, description: 'ID of the user applying' })
  @IsNumber()
  userId: number;
}
