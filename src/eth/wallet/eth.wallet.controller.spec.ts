import { Test, TestingModule } from '@nestjs/testing';
import { EthWalletController } from './eth.wallet.controller';

describe('WalletController', () => {
  let controller: EthWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthWalletController],
    }).compile();

    controller = module.get<EthWalletController>(EthWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
