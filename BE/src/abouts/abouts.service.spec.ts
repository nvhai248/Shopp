import { Test, TestingModule } from '@nestjs/testing';
import { AboutsService } from './abouts.service';
import { ABOUT_TYPE } from 'src/utils/const';
import { prismaMock } from '../../prisma/prisma.mock';
import { DatabaseService } from 'src/database/database.service';

export const mockAbout = [
  {
    id: '1',
    title: 'title',
    description: 'description',
    image: 'image',
    status: true,
    type: ABOUT_TYPE.CHILD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'title',
    description: 'description',
    image: 'image',
    status: true,
    type: ABOUT_TYPE.CHILD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockAboutService = {
  create: jest.fn().mockResolvedValueOnce({
    title: 'title',
    description: 'description',
    image: 'image',
    type: ABOUT_TYPE.CHILD,
  }),
  findAll: jest.fn().mockResolvedValueOnce(ABOUT_TYPE.CHILD),
  findOne: jest.fn().mockResolvedValueOnce('1'),
  update: jest.fn().mockResolvedValue('1'),
};

describe('AboutsService', () => {
  let service: AboutsService;
  let prisma = prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AboutsService, useValue: {} },
        { provide: DatabaseService, useValue: {} },
      ],
    }).compile();

    service = module.get<AboutsService>(AboutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should returns order information', async () => {
      expect(
        await service.create({
          title: 'title',
          description: 'description',
          image: 'image',
          type: ABOUT_TYPE.CHILD,
        }),
      ).toEqual(mockAbout[0]);
    });
  });
});
