import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthWalletService {
    createRandom() {
        return ethers.Wallet.createRandom();
    }

    fromPhrase(pharse: string) {
        return ethers.Wallet.fromPhrase(pharse);
    }

    fromEncryptedJson(json: string, password: Uint8Array) {
        return ethers.Wallet.fromEncryptedJson(json, password);
    }

    fromEncryptedJsonSync(json: string, password: Uint8Array) {
        return ethers.Wallet.fromEncryptedJsonSync(json, password);
    }


}