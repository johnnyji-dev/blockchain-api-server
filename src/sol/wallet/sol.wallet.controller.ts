import { Controller, Get, Query } from '@nestjs/common';
import { SOLANA_SWAGGER_TAG, SOLANA_WALLET_ROUTE_PATH } from '../sol.constants';
import { SolWalletService } from './sol.wallet.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SolWalletResultDescription } from './sol.wallet.data';

@ApiTags(SOLANA_SWAGGER_TAG)
@Controller(SOLANA_WALLET_ROUTE_PATH)
export class SolWalletController {
    constructor(private readonly solWalletService: SolWalletService) { }

    @Get('createKeypair')
    @ApiOperation({
        summary: 'keypair(wallet) 생성',
        description: 'keypair(wallet)을 생성한다.'
    })
    @ApiOkResponse({
        description: SolWalletResultDescription.createKeypair,
        type: String, 
    })
    createWallet() {
        return this.solWalletService.createWallet();
    }

    @Get('generateMnemonics')
    @ApiOperation({
        summary: 'Mnemonics 생성',
        description: 'Mnemonics을 생성한다.'
    })
    @ApiOkResponse({
        description: SolWalletResultDescription.generateMnemonics,
        type: String, 
    })
    generateMnemonics() {
        return this.solWalletService.generateMnemonics();
    }

    @Get('importFromMnemonics') // mnemonics need to reveal
    @ApiOperation({
        summary: 'Mnemonics을 통해 keypair 생성',
        description: 'Mnemonics을 통해 keypair를 생성한다.'
    })
    @ApiQuery({ name: 'mnemonics', type: 'string', required: true, description: '니모닉 단어 목록' })
    @ApiOkResponse({
        description: SolWalletResultDescription.createKeypair,
        type: String, 
    })
    importFromMnemonics(@Query('mnemonics') mnemonics: string) {
        return this.solWalletService.importFromMnemonics(mnemonics);
    }


}
