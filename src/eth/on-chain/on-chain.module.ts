import { Module } from '@nestjs/common';
import { OnChainController } from './on-chain.controller';

@Module({
  controllers: [OnChainController]
})
export class OnChainModule {}
