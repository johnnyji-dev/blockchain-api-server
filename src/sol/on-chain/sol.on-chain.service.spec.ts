import { Test, TestingModule } from '@nestjs/testing';
import { SolOnChainService } from './sol.on-chain.service';

describe('SolOnChainService', () => {
  let service: SolOnChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolOnChainService],
    }).compile();

    service = module.get<SolOnChainService>(SolOnChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
