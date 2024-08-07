import { Injectable } from '@nestjs/common';
import { ethers } from "ethers";

@Injectable()
export class EthService {
    readonly client;

    constructor() {
        const mainEp = process.env.ETH_ALCHEMY_MAIN_EP;
        const testEp = process.env.ETH_ALCHEMY_TEST_SPL_EP;
        this.client = new ethers.JsonRpcProvider(testEp);
    }

    async getLatestBlockNumber(): Promise<any> {
        return await this.client.getBlockNumber();
    }

    async getBalance(walletAddress: string): Promise<any> {
        return await this.client.getBalance(walletAddress);
    }

    createWallet() {
        return ethers.Wallet.createRandom();
    }

    async getFeeData(): Promise<any> {
        return await this.client.getFeeData()
    }
    // async getNonce(walletAddress: string): Promise<any> {
    //     return await this.client.FeeData();
    // }

    // async getChainId(): Promise<any> {
    //     return await this.client.getChainId();
    // }

    // async getGasPrice(): Promise<any> {
    //     return await this.client.eth.getGasPrice();
    // }

    // getCreateWallet(): Promise<any> {
    //     return this.client.eth.accounts.create();
    // }

    // async sendTransferTransaction(sendAddr: string, recvAddr: string, sendAmount: string, pk: string): Promise<any> {

    //     // const privateKey = Buffer.from(pk, 'hex');
    //     const privateKey = pk;

    //     const nonce = await this.client.eth.getTransactionCount(sendAddr);
    //     console.log(nonce);
    //     const gasPrice = this.client.utils.toWei('10', 'gwei'); // Replace with desired gas price
    //     console.log(gasPrice);
    //     const gasLimit = 21000; // Standard gas limit for a simple Ether transfer

    //     let rawTransaction = {
    //         nonce: this.client.utils.toHex(nonce),
    //         to: recvAddr,
    //         value: sendAmount,
    //         gasPrice: gasPrice,
    //         gasLimit: gasLimit,
    //     };

    //     const serializedTx = await this.client.eth.accounts.signTransaction(rawTransaction, privateKey);
    //     console.log(serializedTx);

    //     const broadcastTx = await this.client.eth.sendSignedTransaction(serializedTx.rawTransaction);
    //     console.log(broadcastTx);

    //     return broadcastTx.transactionHash;
    // }

    // async signTransaction(rawTransaction: string, privateKey: string): Promise<any> {
    //     return await this.client.eth.accounts.sign(rawTransaction, privateKey).rawTransaction;
    // }

    // async sendSignedTransaction(signedTransaction: string): Promise<any> {
    //     return await this.client.eth.sendSignedTransaction(signedTransaction).transactionHash;
    // }
}
