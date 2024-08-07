import { Injectable } from '@nestjs/common';
import * as web3 from "@solana/web3.js";

@Injectable()
export class SolOnChainService {
    readonly clientMain; // readonly : 읽기 전용
    readonly clientTest; // readonly : 읽기 전용

    readonly mainEpUrl; // readonly : 읽기 전용
    readonly testEpUrl; // readonly : 읽기 전용

    constructor() {
        this.mainEpUrl = process.env.SOL_ALCHEMY_MAIN_EP;
        this.testEpUrl = process.env.SOL_ALCHEMY_DEV_EP;
        this.clientMain = new web3.Connection(this.mainEpUrl, "confirmed");
        this.clientTest = new web3.Connection(this.testEpUrl, "confirmed");
    }

    async rpcCaller(_networkUrl, _body) {
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(_networkUrl, {
                method: 'POST',
                headers: headers,
                body: _body
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            // console.log(data); // { jsonrpc: '2.0', result: 312701026, id: 1 }
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async getAccountInfo(network: string, publicKey: string): Promise<any> { // 01_01
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            accountInfo: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getAccountInfo',
                "params": [
                    publicKey,
                    {
                        "encoding": "base58"
                    }
                ]
            });

            result.accountInfo = (await this.rpcCaller(epUrl, body)).result.value;
        } catch (error) {
            result.accountInfo = error;
        } finally {
            return result;
        }
    }

    async getBalance(network: string, publicKey: string): Promise<any> { // 01_02
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            balance: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBalance',
                "params": [
                    publicKey,
                ]
            });

            result.balance = (await this.rpcCaller(epUrl, body)).result.value;
        } catch (error) {
            result.balance = error;
        } finally {
            return result;
        }
    }

    async getBlock(network: string, slotNumber: string): Promise<any> { // 01_03
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            block: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlock',
                "params": [
                    Number(slotNumber),
                    {
                        "encoding": "json",
                        "maxSupportedTransactionVersion": 0,
                        "transactionDetails": "full",
                        "rewards": false
                    }
                ]
            });

            result.block = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.block = error;
        } finally {
            return result;
        }
    }

    async getBlockCommitment(network: string, blockNumber: string): Promise<any> { // 01_04
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blockCommitment: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlockCommitment',
                "params": [
                    Number(blockNumber),
                ]
            });

            result.blockCommitment = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blockCommitment = error;
        } finally {
            return result;
        }
    }

    async getBlockHeight(network: string): Promise<any> { // 01_05
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blockHeight: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlockHeight',
            });

            result.blockHeight = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blockHeight = error;
        } finally {
            return result;
        }
    }

    async getBlockProduction(network: string): Promise<any> { // 01_06
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blockHeight: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlockProduction',
            });

            result.blockHeight = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blockHeight = error;
        } finally {
            return result;
        }
    }

    async getBlockTime(network: string, blockNumber: string): Promise<any> { // 01_07
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blockTime: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlockTime',
                "params": [
                    Number(blockNumber),
                ]
            });

            result.blockTime = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blockTime = error;
        } finally {
            return result;
        }
    }

    async getBlocks(network: string, startSlotNumber: string, endSlotNumber: string): Promise<any> { // 01_08
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blocks: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlocks',
                "params": [
                    Number(startSlotNumber),
                    Number(endSlotNumber)
                ]
            });

            result.blocks = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blocks = error;
        } finally {
            return result;
        }
    }

    async getBlocksWithLimit(network: string, startSlotNumber: string, limit: string): Promise<any> { // 01_09
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            blocks: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBlocksWithLimit',
                "params": [
                    Number(startSlotNumber),
                    Number(limit)
                ]
            });

            result.blocks = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.blocks = error;
        } finally {
            return result;
        }
    }

    async getClusterNodes(network: string): Promise<any> { // 01_10
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            clusterNodes: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getClusterNodes',
            });

            result.clusterNodes = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.clusterNodes = error;
        } finally {
            return result;
        }
    }

    async getEpochInfo(network: string): Promise<any> { // 01_11
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            epochInfo: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getEpochInfo',
            });

            result.epochInfo = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.epochInfo = error;
        } finally {
            return result;
        }
    }

    async getEpochSchedule(network: string): Promise<any> { // 01_12
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            epochSchedule: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getEpochSchedule',
            });

            result.epochSchedule = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.epochSchedule = error;
        } finally {
            return result;
        }
    }

    async getFeeForMessage(network: string, encodedMessage: string): Promise<any> { // 01_13
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            feeForMessage: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getFeeForMessage',
                "params": [ // Base-64 encoded Message
                    encodedMessage,
                    {
                        "commitment": "processed"
                    }
                ]
            });

            result.feeForMessage = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.feeForMessage = error;
        } finally {
            return result;
        }
    }

    async getFirstAvailableBlock(network: string): Promise<any> { // 01_14
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            firstAvailableBlock: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getFirstAvailableBlock',
            });

            result.firstAvailableBlock = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.firstAvailableBlock = error;
        } finally {
            return result;
        }
    }

    async getGenesisHash(network: string): Promise<any> { // 01_15
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            genesisHash: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getGenesisHash',
            });

            result.genesisHash = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.genesisHash = error;
        } finally {
            return result;
        }
    }

    async getHealth(network: string): Promise<any> { // 01_16
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            health: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getHealth',
            });

            result.health = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.health = error;
        } finally {
            return result;
        }
    }

    async getHighestSnapshotSlot(network: string): Promise<any> { // 01_17
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            highestSnapshotSlot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getHighestSnapshotSlot',
            });

            result.highestSnapshotSlot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.highestSnapshotSlot = error;
        } finally {
            return result;
        }
    }

    async getIdentity(network: string): Promise<any> { // 01_18
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            identity: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getIdentity',
            });

            result.identity = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.identity = error;
        } finally {
            return result;
        }
    }

    async getInflationGovernor(network: string): Promise<any> { // 01_19
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            identity: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getInflationGovernor',
            });

            result.identity = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.identity = error;
        } finally {
            return result;
        }
    }

    async getInflationRate(network: string): Promise<any> { // 01_20
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            inflationRate: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getInflationRate',
            });

            result.inflationRate = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.inflationRate = error;
        } finally {
            return result;
        }
    }

    async getInflationReward(network: string, addressList: string, epoch: string): Promise<any> { // 01_21
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            inflationReward: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getInflationReward',
                "params": [
                    JSON.parse(addressList),
                    { "epoch": epoch }
                ]
            });

            result.inflationReward = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.inflationReward = error;
        } finally {
            return result;
        }
    }

    async getLargestAccounts(network: string): Promise<any> { // 01_22
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            largestAccounts: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getLargestAccounts',
            });

            result.largestAccounts = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.largestAccounts = error;
        } finally {
            return result;
        }
    }

    async getLatestBlockhash(network: string): Promise<any> { // 01_23
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            latestBlockhash: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getLatestBlockhash',
                "params": [
                    {
                        "commitment": "processed"
                    }
                ]
            });

            result.latestBlockhash = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.latestBlockhash = error;
        } finally {
            return result;
        }
    }

    async getLeaderSchedule(network: string): Promise<any> { // 01_24
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            leaderSchedule: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getLeaderSchedule',
            });

            result.leaderSchedule = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.leaderSchedule = error;
        } finally {
            return result;
        }
    }

    async getMaxRetransmitSlot(network: string): Promise<any> { // 01_25
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            maxRetransmitSlot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getMaxRetransmitSlot',
            });

            result.maxRetransmitSlot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.maxRetransmitSlot = error;
        } finally {
            return result;
        }
    }

    async getMaxShredInsertSlot(network: string): Promise<any> { // 01_26
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            maxShredInsertSlot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getMaxShredInsertSlot',
            });

            result.maxShredInsertSlot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.maxShredInsertSlot = error;
        } finally {
            return result;
        }
    }

    async getMinimumBalanceForRentExemption(network: string, accountDataLength: string): Promise<any> { // 01_27
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            minimumBalanceForRentExemption: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getMinimumBalanceForRentExemption',
                "params": [Number(accountDataLength)]
            });

            result.minimumBalanceForRentExemption = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.minimumBalanceForRentExemption = error;
        } finally {
            return result;
        }
    }

    async getMultipleAccounts(network: string, multipleAccounts: string): Promise<any> { // 01_28
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            multipleAccounts: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getMultipleAccounts',
                "params": [
                    JSON.parse(multipleAccounts),
                    {
                        "encoding": "base58"
                    }
                ]
            });

            result.multipleAccounts = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.multipleAccounts = error;
        } finally {
            return result;
        }
    }

    async getProgramAccounts(network: string, publicKey: string): Promise<any> { // 01_29: Need To Debug
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            programAccounts: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getProgramAccounts',
                "params": [
                    publicKey,
                ]
            });

            result.programAccounts = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.programAccounts = error;
        } finally {
            return result;
        }
    }

    async getRecentPerformanceSamples(network: string, limit: string): Promise<any> { // 01_30
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            recentPerformanceSamples: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getRecentPerformanceSamples',
                "params": [
                    Number(limit),
                ]
            });

            result.recentPerformanceSamples = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.recentPerformanceSamples = error;
        } finally {
            return result;
        }
    }

    async getRecentPrioritizationFees(network: string, addressList: string): Promise<any> { // 01_31
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            recentPrioritizationFees: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getRecentPrioritizationFees',
                "params": [
                    JSON.parse(addressList)
                ]
            });

            result.recentPrioritizationFees = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.recentPrioritizationFees = error;
        } finally {
            return result;
        }
    }

    async getSignatureStatuses(network: string, transactionSignatureList: string): Promise<any> { // 01_32
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            signatureStatuses: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSignatureStatuses',
                "params": [
                    JSON.parse(transactionSignatureList)
                ]
            });

            result.signatureStatuses = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.signatureStatuses = error;
        } finally {
            return result;
        }
    }

    async getSignaturesForAddress(network: string, publicKey: string): Promise<any> { // 01_33 : Need To Debug
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            signaturesForAddress: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSignaturesForAddress',
                "params": [
                    publicKey
                ]
            });

            result.signaturesForAddress = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.signaturesForAddress = error;
        } finally {
            return result;
        }
    }

    async getSlot(network: string): Promise<any> { // 01_34
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            slot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSlot',
            });

            result.slot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.slot = error;
        } finally {
            return result;
        }
    }

    async getSlotLeader(network: string): Promise<any> { // 01_35
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            slot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSlotLeader',
            });

            result.slot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.slot = error;
        } finally {
            return result;
        }
    }

    async getSlotLeaders(network: string, startSlotNumber: string, limit: string): Promise<any> { // 01_36
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            slotLeaders: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSlotLeaders',
                "params": [Number(startSlotNumber), Number(limit)]
            });

            result.slotLeaders = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.slotLeaders = error;
        } finally {
            return result;
        }
    }

    async getStakeActivation(network: string, publicKey: string): Promise<any> { // 01_37
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            stakeActivation: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getStakeActivation',
                "params": [publicKey]
            });

            result.stakeActivation = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.stakeActivation = error;
        } finally {
            return result;
        }
    }

    async getStakeMinimumDelegation(network: string): Promise<any> { // 01_38
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            stakeMinimumDelegation: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getStakeMinimumDelegation',
            });

            result.stakeMinimumDelegation = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.stakeMinimumDelegation = error;
        } finally {
            return result;
        }
    }

    async getSupply(network: string): Promise<any> { // 01_39
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            supply: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getSupply',
            });

            result.supply = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.supply = error;
        } finally {
            return result;
        }
    }

    async getTokenAccountBalance(network: string, publicKey: string): Promise<any> { // 01_40
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            tokenAccountBalance: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenAccountBalance',
                "params": [
                    publicKey
                ]
            });

            result.tokenAccountBalance = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.tokenAccountBalance = error;
        } finally {
            return result;
        }
    }


    async getTokenAccountsByDelegate(network: string, publicKey: string): Promise<any> { // 01_41
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            tokenAccountsByDelegate: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenAccountsByDelegate',
                "params": [
                    publicKey
                ]
            });

            result.tokenAccountsByDelegate = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.tokenAccountsByDelegate = error;
        } finally {
            return result;
        }
    }

    async getTokenAccountsByOwner(network: string, publicKey: string): Promise<any> { // 01_42
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            tokenAccountsByOwner: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenAccountsByOwner',
                "params": [
                    publicKey
                ]
            });

            result.tokenAccountsByOwner = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.tokenAccountsByOwner = error;
        } finally {
            return result;
        }
    }


    async getTokenLargestAccounts(network: string, publicKey: string): Promise<any> { // 01_43
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            tokenLargestAccounts: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenLargestAccounts',
                "params": [
                    publicKey
                ]
            });

            result.tokenLargestAccounts = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.tokenLargestAccounts = error;
        } finally {
            return result;
        }
    }

    async getTokenSupply(network: string, publicKey: string): Promise<any> { // 01_44
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            tokenSupply: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenSupply',
                "params": [
                    publicKey
                ]
            });

            result.tokenSupply = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.tokenSupply = error;
        } finally {
            return result;
        }
    }

    async getTransaction(network: string, transactionSignature: string): Promise<any> { // 01_45
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            transaction: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTransaction',
                "params": [
                    transactionSignature,
                    "json"
                ]
            });

            result.transaction = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.transaction = error;
        } finally {
            return result;
        }
    }

    async getTransactionCount(network: string): Promise<any> { // 01_46
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            transactionCount: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTransactionCount',
            });

            result.transactionCount = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.transactionCount = error;
        } finally {
            return result;
        }
    }

    async getVersion(network: string): Promise<any> { // 01_47
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            version: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getVersion',
            });

            result.version = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.version = error;
        } finally {
            return result;
        }
    }


    async getVoteAccounts(network: string, votePublickey: string): Promise<any> { // 01_48
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            voteAccounts: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getVoteAccounts',
                "params": [
                    {
                        "votePubkey": votePublickey
                    }
                ]
            });

            result.voteAccounts = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.voteAccounts = error;
        } finally {
            return result;
        }
    }

    async getIsBlockhashValid(network: string, publicKey: string): Promise<any> { // 01_49
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            isBlockhashValid: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'isBlockhashValid',
                "params": [
                    publicKey,
                    { "commitment": "processed" }
                ]
            });

            result.isBlockhashValid = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.isBlockhashValid = error;
        } finally {
            return result;
        }
    }

    async getMinimumLedgerSlot(network: string): Promise<any> { // 01_50
        const epUrl = (network === "Mainnet" ? this.mainEpUrl : this.testEpUrl);
        const result = {
            minimumLedgerSlot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getMinimumLedgerSlot',
            });

            result.minimumLedgerSlot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.minimumLedgerSlot = error;
        } finally {
            return result;
        }
    }

    async requestAirdrop(publicKey: string, amount: string): Promise<any> { // 01_51
        const epUrl = this.testEpUrl;
        const result = {
            minimumLedgerSlot: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'requestAirdrop',
                "params": [
                    publicKey,
                    amount // 1000000000 // 1 SOL
                ]
            });

            result.minimumLedgerSlot = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.minimumLedgerSlot = error;
        } finally {
            return result;
        }
    }

    async sendTransaction(network: string, encodedSignedTransaction: string): Promise<any> { // 01_52
        const epUrl = this.testEpUrl;
        const result = {
            transactionHash: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'sendTransaction',
                "params": [
                    encodedSignedTransaction,
                ]
            });

            result.transactionHash = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.transactionHash = error;
        } finally {
            return result;
        }
    }


    async simulateTransaction(network: string, encodedTransaction: string): Promise<any> { // 01_53
        const epUrl = this.testEpUrl;
        const result = {
            simulateTransaction: null
        }
        try {
            const body = JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'simulateTransaction',
                "params": [
                    encodedTransaction,
                ]
            });

            result.simulateTransaction = (await this.rpcCaller(epUrl, body)).result;
        } catch (error) {
            result.simulateTransaction = error;
        } finally {
            return result;
        }
    }










}
