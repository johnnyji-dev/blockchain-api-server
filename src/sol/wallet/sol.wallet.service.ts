import { Injectable } from '@nestjs/common';
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";

@Injectable()
export class SolWalletService {
    createWallet() {
        const wallet = web3.Keypair.generate();

        const result = {
            publicKey: wallet.publicKey,
            secretKey: Buffer.from(wallet.secretKey).toString('hex') // hex-string secret-key
        }
        return result;
    }

    generateMnemonics() {
        const result = {
            mnemonic: bip39.generateMnemonic()
        }
        return result;
    }

    importFromMnemonics(_mnemonics: string) {
        const seed = bip39.mnemonicToSeedSync(_mnemonics, "");
        const wallet = web3.Keypair.fromSeed(seed.slice(0, 32));

        const result = {
            publicKey: wallet.publicKey,
            secretKey: Buffer.from(wallet.secretKey).toString('hex') // hex-string secret-key
        }
        return result;
    }
}
