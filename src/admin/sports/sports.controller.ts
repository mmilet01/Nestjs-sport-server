// src/admin/controllers/sports.controller.ts
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
import { Role } from '../../entities/role.entity';
import { Roles } from '../../shared/decorators/constants';
import { RolesGuard } from '../../shared/roles.guard';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { AdminSportsService } from './sports.service';
import { ERole } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@ApiTags('admin/sports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ERole.Admin) // only admins can access these routes
@Controller('admin/sports')
export class AdminSportsController {
  constructor(private readonly sportsService: AdminSportsService) {}

  @ApiOperation({ summary: 'Create a new sport' })
  @Post()
  create(@Body() createSportDto: CreateSportDto) {
    return this.sportsService.create(createSportDto);
  }

  @ApiOperation({ summary: 'Get all sports' })
  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  @ApiOperation({ summary: 'Get sport details by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sportsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a sport by ID' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSportDto: UpdateSportDto,
  ) {
    return this.sportsService.update(id, updateSportDto);
  }

  @ApiOperation({ summary: 'Delete a sport by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sportsService.remove(id);
  }
}
