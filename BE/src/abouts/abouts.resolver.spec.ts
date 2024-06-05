import { Test, TestingModule } from '@nestjs/testing';
import { AboutsResolver } from './abouts.resolver';
import { AboutsService } from './abouts.service';
import { mockAbout, mockAboutService } from './abouts.service.spec';
import { ABOUT_TYPE } from 'src/utils/const';

describe('AboutsResolver', () => {
  let resolver: AboutsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutsResolver,
        {
          provide: AboutsService,
          useValue: { mockAboutService },
        },
      ],
    }).compile();

    resolver = module.get<AboutsResolver>(AboutsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should returns an array of key value pair objects', async () => {
      expect(await resolver.findByType()).toEqual(mockAbout);
    });
  });
});
