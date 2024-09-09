import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ETHEREUM_SWAGGER_TAG, ETHEREUM_WALLET_ROUTE_PATH } from '../eth.constants';
import { EthWalletService } from './eth.wallet.service';
import { EthWalletResultDescription, MnemonicPhrase } from './eth.wallet.data';

@ApiTags(ETHEREUM_SWAGGER_TAG)
@Controller(ETHEREUM_WALLET_ROUTE_PATH)
export class EthWalletController {
    constructor(private readonly ethWalletService: EthWalletService) {}

    @Get('createRandom')
    @ApiOperation({
        summary: 'Creates a new random HDNodeWallet',
        description: 'Creates a new random [[HDNodeWallet]] using the available [cryptographic random source](randomBytes)'
    })
    @ApiOkResponse({
        description: EthWalletResultDescription.createRandom,
        type: String,
    })
    test1Wallet() {
        return this.ethWalletService.createRandom();
    }

    @Post('fromPhrase')
    @ApiOperation({
        summary: 'Creates a HDNodeWallet with mnemonic.',
        description: 'Creates a HDNodeWallet for phrase.'
    })
    @ApiBody({
        type : MnemonicPhrase
    })
    @ApiOkResponse({
        description: EthWalletResultDescription.createRandom,
        type: String,
    })
    fromPhrase(@Body() mnemonicPharse: MnemonicPhrase) {
        return this.ethWalletService.fromPhrase(mnemonicPharse.mnemonic);
    }

}
