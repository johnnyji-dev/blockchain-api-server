import { Test, TestingModule } from '@nestjs/testing';
import { SolOnChainController } from './sol.on-chain.controller';

describe('SolOnChainController', () => {
  let controller: SolOnChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolOnChainController],
    }).compile();

    controller = module.get<SolOnChainController>(SolOnChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
