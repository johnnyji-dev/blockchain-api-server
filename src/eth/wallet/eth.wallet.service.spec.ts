import { Test, TestingModule } from '@nestjs/testing';
import { EthWalletService } from './eth.wallet.service';

describe('EthWalletService', () => {
  let service: EthWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthWalletService],
    }).compile();

    service = module.get<EthWalletService>(EthWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
