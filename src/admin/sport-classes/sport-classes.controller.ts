import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../shared/decorators/constants';
import { RolesGuard } from '../../shared/roles.guard';
import { CreateSportsClassDto } from './dto/create-sports-class.dto';
import { UpdateSportsClassDto } from './dto/update-sports-class.dto';
import { AdminClassesService } from './sport-classes.service';
import { ERole } from '../../shared/enums/role.enum';

@ApiTags('admin/classes')
@UseGuards(RolesGuard)
@Roles(ERole.Admin)
@Controller('admin/classes')
export class AdminClassesController {
  constructor(private readonly classesService: AdminClassesService) {}

  @ApiOperation({ summary: 'Create a new sports class (admin)' })
  @Post()
  create(@Body() dto: CreateSportsClassDto) {
    return this.classesService.create(dto);
  }

  @ApiOperation({ summary: 'Get all sports classes (admin)' })
  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @ApiOperation({ summary: 'Get sports class by ID (admin)' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a sports class (admin)' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSportsClassDto,
  ) {
    return this.classesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a sports class (admin)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.remove(id);
  }
}
