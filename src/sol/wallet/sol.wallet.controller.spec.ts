import { Test, TestingModule } from '@nestjs/testing';
import { SolWalletController } from './sol.wallet.controller';

describe('WalletController', () => {
  let controller: SolWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolWalletController],
    }).compile();

    controller = module.get<SolWalletController>(SolWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
