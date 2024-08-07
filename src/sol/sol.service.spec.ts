import { Test, TestingModule } from '@nestjs/testing';
import { SolService } from './sol.service';

describe('SolService', () => {
  let service: SolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolService],
    }).compile();

    service = module.get<SolService>(SolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
