import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserSessionsService } from './user-sessions.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CreateApplicationDto } from './dto/create-user-application.dto';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { TokenPayload } from '../shared/types';

@ApiTags('sessions')
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class UserSessionsController {
  constructor(private readonly sessionsService: UserSessionsService) {}

  @ApiOperation({ summary: 'Get all class sessions' })
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @ApiOperation({ summary: 'Get all sessions applied by the current user' })
  @Get('applied')
  getAppliedSessions(@CurrentUser() user: TokenPayload) {
    const userId = user.userId;
    return this.sessionsService.findAppliedSessions(userId);
  }

  @ApiOperation({ summary: 'Get details of a class session' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Apply for a class session' })
  @Post(':id/apply')
  apply(
    @Param('id', ParseIntPipe) id: number,
    @Body() createApplicationDto: CreateApplicationDto,
    @CurrentUser() user: TokenPayload,
  ) {
    createApplicationDto.userId = user.userId;
    return this.sessionsService.apply(id, createApplicationDto);
  }

  @ApiOperation({ summary: 'Get all sessions for a specific sport' })
  @Get('sport/:sportId')
  getSessionsBySport(@Param('sportId', ParseIntPipe) sportId: number) {
    return this.sessionsService.findSessionsBySport(sportId);
  }
}
