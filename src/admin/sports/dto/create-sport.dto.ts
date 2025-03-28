import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({ example: 'Basketball' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
