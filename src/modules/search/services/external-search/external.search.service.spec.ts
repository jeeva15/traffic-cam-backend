import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSearchService } from './external.search.service';

describe('ExternalSearchService', () => {
  let service: ExternalSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalSearchService],
    }).compile();

    service = module.get<ExternalSearchService>(ExternalSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
