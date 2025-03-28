import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AdminSessionsService } from '../admin/sessions/sessions.service';
import { ClassSession } from '../entities/class-session.entity';
import { SportsClass } from '../entities/sports-class.entity';

describe('AdminSessionsService', () => {
  let service: AdminSessionsService;

  const mockSessionRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockSportsClassRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminSessionsService,
        {
          provide: getRepositoryToken(ClassSession),
          useValue: mockSessionRepository,
        },
        {
          provide: getRepositoryToken(SportsClass),
          useValue: mockSportsClassRepository,
        },
      ],
    }).compile();

    service = module.get<AdminSessionsService>(AdminSessionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new session when sportsClass exists', async () => {
      // Arrange
      const dto = {
        sportsClassId: 1,
        sessionDate: '2025-04-01',
        freeSpots: 10,
      };
      const sportsClass = {
        id: 1,
        duration: '1h30m',
        description: 'Test Class',
      };
      const newSession = {
        sessionDate: new Date(dto.sessionDate),
        sportsClass,
      };
      const savedSession = { id: 1, ...newSession };

      mockSportsClassRepository.findOne.mockResolvedValue(sportsClass);
      mockSessionRepository.create.mockReturnValue(newSession);
      mockSessionRepository.save.mockResolvedValue(savedSession);

      // Act
      const result = await service.create(dto);

      // Assert
      expect(mockSportsClassRepository.findOne).toHaveBeenCalledWith({
        where: { id: dto.sportsClassId },
      });
      expect(mockSessionRepository.create).toHaveBeenCalledWith({
        sportsClass,
        sessionDate: new Date(dto.sessionDate),
        freeSpots: dto.freeSpots,
      });
      expect(result).toEqual(savedSession);
    });

    it('should throw NotFoundException if sportsClass does not exist', async () => {
      const dto = {
        sportsClassId: 999,
        sessionDate: '2025-04-01',
        freeSpots: 15,
      };
      mockSportsClassRepository.findOne.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
