import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AdminModule } from '../admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSession } from '../entities/class-session.entity';
import { SportsClass } from '../entities/sports-class.entity';
import { Sport } from '../entities/sport.entity';
import { ClassApplication } from '../entities/class-application.entity';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { ClassSchedule } from '../entities/class-schedule.entity';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/roles.guard';

describe('AdminSessionsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [
            Sport,
            SportsClass,
            ClassSession,
            ClassApplication,
            User,
            Role,
            ClassSchedule,
          ],
          synchronize: true,
        }),
        AdminModule,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /admin/sessions should create a new session', async () => {
    const sportsResponse = await request(app.getHttpServer())
      .post('/admin/sports')
      .send({ name: 'Basketball' })
      .expect(201);

    const sportId = sportsResponse.body.id;

    const classResponse = await request(app.getHttpServer())
      .post('/admin/classes')
      .send({
        sportId,
        duration: '1h30m',
        description: 'Beginner Basketball Class',
      })
      .expect(201);

    const sportsClassId = classResponse.body.id;

    const sessionDto = {
      sportsClassId,
      sessionDate: '2025-04-01',
    };

    const response = await request(app.getHttpServer())
      .post('/admin/sessions')
      .send(sessionDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.sportsClass.id).toEqual(sportsClassId);
    expect(response.body.sessionDate).toEqual('2025-04-01T00:00:00.000Z');
  });
});
