import { Controller, Get, Query, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClassesService } from './user-classes.service';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @ApiOperation({
    summary: 'Get all sports classes, optionally filtered by sport names',
  })
  @Get()
  findAll(@Query('sports') sports?: string) {
    return this.classesService.findAllFiltered(sports);
  }
}
