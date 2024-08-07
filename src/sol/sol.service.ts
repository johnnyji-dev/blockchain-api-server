import { Injectable } from '@nestjs/common';
import * as web3 from "@solana/web3.js";

@Injectable()
export class SolService {
    readonly client; // readonly : 읽기 전용

    constructor() {
        const mainEp = process.env.SOL_ALCHEMY_MAIN_EP;
        const testEp = process.env.SOL_ALCHEMY_DEV_EP;
        this.client = new web3.Connection(testEp, "confirmed");
    }

    // async getLatestBlockNumber(): Promise<any> {
    //     return await this.client.getBlockHeight();
    // }
    
}
