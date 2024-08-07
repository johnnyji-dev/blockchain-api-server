import { Module } from '@nestjs/common';
import { SolController } from './sol.controller';
import { SolService } from './sol.service';
import { SolWalletModule } from './wallet/sol.wallet.module';
import { SolOnChainModule } from './on-chain/sol.on-chain.module';

@Module({
  controllers: [SolController],
  providers: [SolService],
  imports: [SolWalletModule, SolOnChainModule],
})
export class SolModule { }
