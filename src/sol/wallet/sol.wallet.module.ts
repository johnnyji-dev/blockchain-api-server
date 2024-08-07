import { Module } from '@nestjs/common';
import { SolWalletController } from './sol.wallet.controller';
import { SolWalletService } from './sol.wallet.service';

@Module({
    controllers: [SolWalletController],
    providers: [SolWalletService]
})
export class SolWalletModule { }
