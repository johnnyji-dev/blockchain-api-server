import { Test, TestingModule } from '@nestjs/testing';
import { SolController } from './sol.controller';

describe('SolController', () => {
  let controller: SolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolController],
    }).compile();

    controller = module.get<SolController>(SolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
