import { Module } from '@nestjs/common';
import { EthWalletController } from './eth.wallet.controller';
import { EthWalletService } from './eth.wallet.service';

@Module({
  controllers: [EthWalletController],
  providers: [EthWalletService]
})
export class EthWalletModule {}

