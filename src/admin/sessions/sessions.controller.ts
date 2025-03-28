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
import { ERole } from '../../shared/enums/role.enum';
import { RolesGuard } from '../../shared/roles.guard';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { AdminSessionsService } from './sessions.service';

@ApiTags('admin/sessions')
@UseGuards(RolesGuard)
@Roles(ERole.Admin)
@Controller('admin/sessions')
export class AdminSessionsController {
  constructor(private readonly sessionsService: AdminSessionsService) {}

  @ApiOperation({ summary: 'Create a new class session (admin)' })
  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.sessionsService.create(dto);
  }

  @ApiOperation({ summary: 'Update a class session (admin)' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSessionDto) {
    return this.sessionsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a class session (admin)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessionsService.remove(id);
  }
}
