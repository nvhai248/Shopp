import { Test, TestingModule } from '@nestjs/testing';
import { AboutsService } from './abouts.service';
import { DatabaseService } from 'src/database/database.service';
import { prismaMock } from '../../prisma/prisma.mock';

describe('AboutsService', () => {
  let service: AboutsService;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutsService, DatabaseService],
    }).compile();

    service = module.get<AboutsService>(AboutsService);
    prisma = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if about not found', async () => {
    prismaMock.about.findFirst.mockResolvedValue(null);

    expect(await service.findOne('id-not-found')).toBeNull();
  });
});
