import { Module } from '@nestjs/common';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';
import { EthWalletModule } from './wallet/eth.wallet.module';
import { OnChainModule } from './on-chain/on-chain.module';

@Module({
  controllers: [EthController],
  providers: [EthService],
  imports: [EthWalletModule, OnChainModule]
})
export class EthModule {}
