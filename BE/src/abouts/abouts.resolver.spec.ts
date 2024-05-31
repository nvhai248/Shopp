import { Test, TestingModule } from '@nestjs/testing';
import { AboutsResolver } from './abouts.resolver';
import { AboutsService } from './abouts.service';

describe('AboutsResolver', () => {
  let resolver: AboutsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutsResolver, AboutsService],
    }).compile();

    resolver = module.get<AboutsResolver>(AboutsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
