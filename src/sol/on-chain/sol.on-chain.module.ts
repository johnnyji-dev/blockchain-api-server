import { Module } from '@nestjs/common';
import { SolOnChainController } from './sol.on-chain.controller';
import { SolOnChainService } from './sol.on-chain.service';

@Module({
  controllers: [SolOnChainController],
  providers: [SolOnChainService]
})
export class SolOnChainModule {}
