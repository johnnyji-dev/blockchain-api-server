import { Controller, Get, Param, Query } from '@nestjs/common';
import { SOLANA_ONCHAIN_ROUTE_PATH, SOLANA_SWAGGER_TAG } from '../sol.constants';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SolOnChainService } from './sol.on-chain.service';
import { NetworkSelector, OnChainSolResultDescription } from './sol.on-chain.data';

@ApiTags(SOLANA_SWAGGER_TAG)
@Controller(SOLANA_ONCHAIN_ROUTE_PATH)
export class SolOnChainController {
    constructor(private readonly solOnChainService: SolOnChainService) {}

    @Get('accountInfo/:publicKey') // 01_01
    @ApiOperation({
        summary: 'retrieve account information',
        description: 'Returns all information associated with the account of provided Pubkey'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of account to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getAccountInfo,
        type: String, 
    })
    async getAccountInfo(@Query('network') network: string, @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getAccountInfo(network, publicKey);
    }

    @Get('balance/:publicKey') // 01_02
    @ApiOperation({
        summary: 'retrieve account balance',
        description: 'Returns the lamport balance of the account of provided Pubkey'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of account to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBalance,
        type: String
    })
    async getBalance(@Query('network') network: string, @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getBalance(network, publicKey);
    }

    @Get('block/:slotNumber') // 01_03
    @ApiOperation({
        summary: 'retrieve a confirmed block information',
        description: 'Returns identity and transaction information about a confirmed block in the ledger'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'slotNumber',
        type: 'string',
        required: true,
        description: 'slot number, as u64 integer'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlock,
        type: String
    })
    async getBlock(@Query('network') network: string, @Param('slotNumber') slotNumber: string): Promise<any> {
        return this.solOnChainService.getBlock(network, slotNumber);
    }

    @Get('block/:blockNumber') // 01_04
    @ApiOperation({
        summary: 'retrieve commitment for particular block',
        description: 'Returns commitment for particular block'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'blockNumber',
        type: 'string',
        required: true,
        description: 'block number, identified by Slot'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlockCommitment,
        type: String
    })
    async getBlockCommitment(@Query('network') network: string, @Param('blockNumber') blockNumber: string): Promise<any> {
        return this.solOnChainService.getBlockCommitment(network, blockNumber);
    }

    @Get('latestBlockNumber') // 01_05
    @ApiOperation({
        summary: 'retrieve the current block height',
        description: 'Returns the current block height of the node'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlockHeight,
        type: String
    })
    async getLatestBlockNumber(@Query('network') network: string) {
        return this.solOnChainService.getBlockHeight(network);
    }

    @Get('blockProduction') // 01_06
    @ApiOperation({
        summary: 'retrieve recent block production information',
        description: 'Returns recent block production information from the current or previous epoch.'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlockProduction,
        type: String
    })
    async getBlockProduction(@Query('network') network: string) {
        return this.solOnChainService.getBlockProduction(network);
    }

    @Get('blockTime/:blockNumber') // 01_07
    @ApiOperation({
        summary: 'retrieve estimated production time of a block',
        description: 'Returns the estimated production time of a block.'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'blockNumber',
        type: 'string',
        required: true,
        description: 'block number, identified by Slot'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlockTime,
        type: String
    })
    async getBlockTime(@Query('network') network: string, @Param('blockNumber') blockNumber: string) {
        return this.solOnChainService.getBlockTime(network, blockNumber);
    }

    @Get('blocks/:startSlotNumber/:endSlotNumber') // 01_08
    @ApiOperation({
        summary: 'retrieve a list of confirmed blocks',
        description: 'Returns a list of confirmed blocks between two slots'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'startSlotNumber',
        type: 'string',
        required: true,
        description: 'start_slot, as u64 integer'
    })
    @ApiParam({
        name: 'endSlotNumber',
        type: 'string',
        required: true,
        description: 'end_slot, as u64 integer (must be no more than 500,000 blocks higher than the start_slot)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlocks,
        type: String
    })
    async getBlocks(
        @Query('network') network: string, 
        @Param('startSlotNumber') startSlotNumber: string, 
        @Param('endSlotNumber') endSlotNumber: string) {
        return this.solOnChainService.getBlocks(network, startSlotNumber, endSlotNumber);
    }

    @Get('blocksWithLimit/:startSlotNumber/:limit') // 01_09
    @ApiOperation({
        summary: 'retrieve a list of confirmed blocks',
        description: 'Returns a list of confirmed blocks starting at the given slot'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'startSlotNumber',
        type: 'string',
        required: true,
        description: 'start_slot, as u64 integer'
    })
    @ApiParam({
        name: 'limit',
        type: 'string',
        required: true,
        description: 'limit, as u64 integer (must be no more than 500,000 blocks higher than the start_slot)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getBlocksWithLimit,
        type: String
    })
    async getBlocksWithLimit(
        @Query('network') network: string, 
        @Param('startSlotNumber') startSlotNumber: string, 
        @Param('limit') limit: string) {
        return this.solOnChainService.getBlocksWithLimit(network, startSlotNumber, limit);
    }

    @Get('clusterNodes') // 01_10
    @ApiOperation({
        summary: 'retrieve a information all nodes',
        description: 'Returns information about all the nodes participating in the cluster'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getClusterNodes,
        type: String
    })
    async getClusterNodes(
        @Query('network') network: string) {
        return this.solOnChainService.getClusterNodes(network);
    }

    @Get('epochInfo') // 01_11
    @ApiOperation({
        summary: 'retrieve information about the current epoch',
        description: 'Returns information about the current epoch'
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getEpochInfo,
        type: String
    })
    async getEpochInfo(
        @Query('network') network: string) {
        return this.solOnChainService.getEpochInfo(network);
    }

    @Get('epochSchedule') // 01_12
    @ApiOperation({
        summary: 'retrieve the epoch schedule information',
        description: `Returns the epoch schedule information from this cluster's genesis config`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getEpochSchedule,
        type: String
    })
    async getEpochSchedule(
        @Query('network') network: string) {
        return this.solOnChainService.getEpochSchedule(network);
    }

    @Get('feeForMessage/:encodedMessage') // 01_13
    @ApiOperation({
        summary: 'retrieve the fee for a particular Message',
        description: `Get the fee the network will charge for a particular Message`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'encodedMessage',
        type: 'string',
        required: true,
        description: 'Base-64 encoded Message'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getFeeForMessage,
        type: String
    })
    async getFeeForMessage(
        @Query('network') network: string,
        @Param('encodedMessage') encodedMessage: string) {
        return this.solOnChainService.getFeeForMessage(network, encodedMessage);
    }

    @Get('firstAvailableBlock') // 01_14
    @ApiOperation({
        summary: 'retrieve the slot of the lowest confirmed block',
        description: `Returns the slot of the lowest confirmed block that has not been purged from the ledger`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getFirstAvailableBlock,
        type: String
    })
    async getFirstAvailableBlock(
        @Query('network') network: string) {
        return this.solOnChainService.getFirstAvailableBlock(network);
    }

    @Get('genesisHash') // 01_15
    @ApiOperation({
        summary: 'retrieve the genesis hash',
        description: `Returns the genesis hash`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getGenesisHash,
        type: String
    })
    async getGenesisHash(
        @Query('network') network: string) {
        return this.solOnChainService.getGenesisHash(network);
    }

    @Get('health') // 01_16
    @ApiOperation({
        summary: 'retrieve the current health of the node',
        description: `Returns the current health of the node. A healthy node is one that is within HEALTH_CHECK_SLOT_DISTANCE slots of the latest cluster confirmed slot.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getHealth,
        type: String
    })
    async getHealth(
        @Query('network') network: string) {
        return this.solOnChainService.getHealth(network);
    }

    @Get('highestSnapshotSlot') // 01_17
    @ApiOperation({
        summary: 'retrieve the highest slot information',
        description: `Returns the highest slot information that the node has snapshots for.
        This will find the highest full snapshot slot, and the highest incremental snapshot slot based on the full snapshot slot, if there is one.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getHighestSnapshotSlot,
        type: String
    })
    async getHighestSnapshotSlot(
        @Query('network') network: string) {
        return this.solOnChainService.getHighestSnapshotSlot(network);
    }

    @Get('identity') // 01_18
    @ApiOperation({
        summary: 'retrieve the identity pubkey',
        description: `Returns the identity pubkey for the current node`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getIdentity,
        type: String
    })
    async getIdentity(
        @Query('network') network: string) {
        return this.solOnChainService.getIdentity(network);
    }

    @Get('inflationGovernor') // 01_19
    @ApiOperation({
        summary: 'retrieve the current inflation governor',
        description: `Returns the current inflation governor`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getIdentity,
        type: String
    })
    async getInflationGovernor(
        @Query('network') network: string) {
        return this.solOnChainService.getInflationGovernor(network);
    }

    @Get('inflationRate') // 01_20
    @ApiOperation({
        summary: 'retrieve the specific inflation values for the current epoch',
        description: `Returns the specific inflation values for the current epoch`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getInflationRate,
        type: String
    })
    async getInflationRate(
        @Query('network') network: string) {
        return this.solOnChainService.getInflationRate(network);
    }

    @Get('inflationReward/:addressList/:epoch') // 01_21
    @ApiOperation({
        summary: 'retrieve the inflation / staking reward for a list of addresses for an epoch',
        description: `Returns the inflation / staking reward for a list of addresses for an epoch`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'addressList',
        type: 'string',
        required: true,
        description: 'An array of addresses to query, as base-58 encoded strings'
    })
    @ApiParam({
        name: 'epoch',
        type: 'string',
        required: true,
        description: 'An epoch for which the reward occurs. If omitted, the previous epoch will be used'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getInflationReward,
        type: String
    })
    async getInflationReward(
        @Query('network') network: string,
        @Param('addressList') addressList: string, 
        @Param('epoch') epoch: string) {
        return this.solOnChainService.getInflationReward(network, addressList, epoch);
    }

    @Get('largestAccounts') // 01_22
    @ApiOperation({
        summary: 'retrieve the 20 largest accounts',
        description: `Returns the 20 largest accounts, by lamport balance (results may be cached up to two hours)`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getLargestAccounts,
        type: String
    })
    async getLargestAccounts(
        @Query('network') network: string) {
        return this.solOnChainService.getLargestAccounts(network);
    }

    @Get('latestBlockhash') // 01_23
    @ApiOperation({
        summary: 'retrieve the latest blockhash',
        description: `Returns the latest blockhash`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getLatestBlockhash,
        type: String
    })
    async getLatestBlockhash(
        @Query('network') network: string) {
        return this.solOnChainService.getLatestBlockhash(network);
    }

    @Get('leaderSchedule') // 01_24
    @ApiOperation({
        summary: 'retrieve the leader schedule for an epoch',
        description: `Returns the leader schedule for an epoch`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getLeaderSchedule,
        type: String
    })
    async getLeaderSchedule(
        @Query('network') network: string) {
        return this.solOnChainService.getLeaderSchedule(network);
    }

    @Get('maxRetransmitSlot') // 01_25
    @ApiOperation({
        summary: 'retrieve the max slot seen from retransmit stage.',
        description: `Get the max slot seen from retransmit stage.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getMaxRetransmitSlot,
        type: String
    })
    async getMaxRetransmitSlot(
        @Query('network') network: string) {
        return this.solOnChainService.getMaxRetransmitSlot(network);
    }

    @Get('maxShredInsertSlot') // 01_26
    @ApiOperation({
        summary: 'retrieve the max slot seen from after shred insert.',
        description: `Get the max slot seen from after shred insert.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getMaxShredInsertSlot,
        type: String
    })
    async getMaxShredInsertSlot(
        @Query('network') network: string) {
        return this.solOnChainService.getMaxRetransmitSlot(network);
    }

    @Get('minimumBalanceForRentExemption/:accountDataLength') // 01_27
    @ApiOperation({
        summary: 'retrieve minimum balance.',
        description: `Returns minimum balance required to make account rent exempt.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'accountDataLength',
        type: 'string',
        required: true,
        description: 'the Account\'s data length'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getMinimumBalanceForRentExemption,
        type: String
    })
    async getMinimumBalanceForRentExemption(
        @Query('network') network: string,
        @Param('accountDataLength') accountDataLength: string) {
        return this.solOnChainService.getMinimumBalanceForRentExemption(network, accountDataLength);
    }

    @Get('multipleAccounts/:multipleAccounts') // 01_28
    @ApiOperation({
        summary: 'retrieve the account information for a list of Pubkeys.',
        description: `Returns the account information for a list of Pubkeys.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'multipleAccounts',
        type: 'string',
        required: true,
        description: 'An array of Pubkeys to query, as base-58 encoded strings (up to a maximum of 100)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getMultipleAccounts,
        type: String
    })
    async getMultipleAccounts(
        @Query('network') network: string,
        @Param('accountDataLength') accountDataLength: string) {
        return this.solOnChainService.getMultipleAccounts(network, accountDataLength);
    }

    @Get('programAccounts/:publicKey') // 01_29: Need To Debug
    @ApiOperation({
        summary: 'retrieve all accounts owned by the provided program Pubkey',
        description: `Returns all accounts owned by the provided program Pubkey`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of program, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getProgramAccounts,
        type: String
    })
    async getProgramAccounts(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getProgramAccounts(network, publicKey);
    }


    @Get('recentPerformanceSamples/:limit') // 01_30
    @ApiOperation({
        summary: 'retrieve a list of recent performance samples',
        description: `Returns a list of recent performance samples, in reverse slot order. 
        Performance samples are taken every 60 seconds and include the number of transactions and slots that occur in a given time window.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'limit',
        type: 'string',
        required: true,
        description: 'number of samples to return (maximum 720)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getRecentPerformanceSamples,
        type: String
    })
    async getRecentPerformanceSamples(
        @Query('network') network: string,
        @Param('limit') limit: string) {
        return this.solOnChainService.getRecentPerformanceSamples(network, limit);
    }

    @Get('recentPrioritizationFees/:addressList') // 01_31
    @ApiOperation({
        summary: 'retrieve a list of prioritization fees from recent blocks.',
        description: `Returns a list of prioritization fees from recent blocks.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'addressList',
        type: 'string',
        required: true,
        description: 'An array of Account addresses (up to a maximum of 128 addresses), as base-58 encoded strings'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getRecentPrioritizationFees,
        type: String
    })
    async getRecentPrioritizationFees(
        @Query('network') network: string,
        @Param('addressList') addressList: string) {
        return this.solOnChainService.getRecentPrioritizationFees(network, addressList);
    }

    @Get('signatureStatuses/:transactionSignatureList') // 01_32
    @ApiOperation({
        summary: 'retrieve the statuses of a list of signatures.',
        description: `Returns the statuses of a list of signatures. Each signature must be a txid, the first signature of a transaction.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'transactionSignatureList',
        type: 'string',
        required: true,
        description: 'An array of transaction signatures to confirm, as base-58 encoded strings (up to a maximum of 256)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSignatureStatuses,
        type: String
    })
    async getSignatureStatuses(
        @Query('network') network: string,
        @Param('transactionSignatureList') transactionSignatureList: string) {
        return this.solOnChainService.getSignatureStatuses(network, transactionSignatureList);
    }

    @Get('signatureStatuses/:publicKey') // 01_33 : Need To Debug
    @ApiOperation({
        summary: 'retrieve signatures for confirmed transactions',
        description: `Returns signatures for confirmed transactions that include the given address in their accountKeys list. 
        Returns signatures backwards in time from the provided signature or most recent confirmed block`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Account address as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSignaturesForAddress,
        type: String
    })
    async getSignaturesForAddress(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getSignaturesForAddress(network, publicKey);
    }

    @Get('slot') // 01_34
    @ApiOperation({
        summary: 'retrieve the slot',
        description: `Returns the slot that has reached the given or default commitment level`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSlot,
        type: String
    })
    async getSlot(
        @Query('network') network: string) {
        return this.solOnChainService.getSlot(network);
    }

    @Get('slotLeader') // 01_35
    @ApiOperation({
        summary: 'retrieve the current slot leader',
        description: `Returns the current slot leader`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSlotLeader,
        type: String
    })
    async getSlotLeader(
        @Query('network') network: string) {
        return this.solOnChainService.getSlotLeader(network);
    }

    @Get('slotLeaders') // 01_36
    @ApiOperation({
        summary: 'retrieve the slot leaders',
        description: `Returns the slot leaders for a given slot range`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'startSlotNumber',
        type: 'string',
        required: true,
        description: 'Start slot, as u64 integer'
    })
    @ApiParam({
        name: 'limit',
        type: 'string',
        required: true,
        description: 'Limit, as u64 integer (between 1 and 5,000)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSlotLeaders,
        type: String
    })
    async getSlotLeaders(
        @Query('network') network: string, 
        @Param('startSlotNumber') startSlotNumber: string, 
        @Param('limit') limit: string) {
        return this.solOnChainService.getSlotLeaders(network, startSlotNumber, limit);
    }

    @Get('stakeActivation') // 01_37
    @ApiOperation({
        summary: 'retrieve epoch activation information',
        description: `Returns epoch activation information for a stake account`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of stake Account to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getStakeActivation,
        type: String
    })
    async getStakeActivation(
        @Query('network') network: string, 
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getStakeActivation(network, publicKey);
    }

    @Get('stakeMinimumDelegation') // 01_38
    @ApiOperation({
        summary: 'retrieve the stake minimum delegation',
        description: `Returns the stake minimum delegation, in lamports.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getStakeMinimumDelegation,
        type: String
    })
    async getStakeMinimumDelegation(
        @Query('network') network: string) {
        return this.solOnChainService.getStakeMinimumDelegation(network);
    }

    @Get('supply') // 01_39
    @ApiOperation({
        summary: 'retrieve information',
        description: `Returns information about the current supply.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getSupply,
        type: String
    })
    async getSupply(
        @Query('network') network: string) {
        return this.solOnChainService.getSupply(network);
    }

    @Get('tokenAccountBalance/:publicKey') // 01_40
    @ApiOperation({
        summary: 'retrieve the token balance',
        description: `Returns the token balance of an SPL Token account.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of Token account to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTokenAccountBalance,
        type: String
    })
    async getTokenAccountBalance(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getTokenAccountBalance(network, publicKey);
    }

    @Get('tokenAccountsByDelegate/:publicKey') // 01_41
    @ApiOperation({
        summary: 'retrieve all SPL Token accounts by approved Delegate.',
        description: `Returns all SPL Token accounts by approved Delegate.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of account delegate to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTokenAccountsByDelegate,
        type: String
    })
    async getTokenAccountsByDelegate(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getTokenAccountsByDelegate(network, publicKey);
    }

    @Get('tokenAccountsByOwner/:publicKey') // 01_42
    @ApiOperation({
        summary: 'retrieve all SPL Token accounts by token owner.',
        description: `Returns all SPL Token accounts by token owner.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of account delegate to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTokenAccountsByOwner,
        type: String
    })
    async getTokenAccountsByOwner(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getTokenAccountsByOwner(network, publicKey);
    }

    @Get('tokenLargestAccounts/:publicKey') // 01_43
    @ApiOperation({
        summary: 'retrieve the 20 largest accounts',
        description: `Returns the 20 largest accounts of a particular SPL Token type.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of the token Mint to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTokenLargestAccounts,
        type: String
    })
    async getTokenLargestAccounts(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getTokenLargestAccounts(network, publicKey);
    }

    @Get('tokenSupply/:publicKey') // 01_44
    @ApiOperation({
        summary: 'retrieve the total supply of an SPL Token type.',
        description: `Returns the total supply of an SPL Token type.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of the token Mint to query, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTokenSupply,
        type: String
    })
    async getTokenSupply(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getTokenSupply(network, publicKey);
    }

    @Get('transaction/:transactionSignature') // 01_45
    @ApiOperation({
        summary: 'retrieve transaction details',
        description: `Returns transaction details for a confirmed transaction`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'transactionSignature',
        type: 'string',
        required: true,
        description: 'Transaction signature, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTransaction,
        type: String
    })
    async getTransaction(
        @Query('network') network: string,
        @Param('transactionSignature') transactionSignature: string) {
        return this.solOnChainService.getTransaction(network, transactionSignature);
    }

    @Get('transactionCount') // 01_46
    @ApiOperation({
        summary: 'retrieve the current Transaction count',
        description: `Returns the current Transaction count from the ledger`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getTransactionCount,
        type: String
    })
    async getTransactionCount(
        @Query('network') network: string) {
        return this.solOnChainService.getTransactionCount(network);
    }

    @Get('transactionCount') // 01_47
    @ApiOperation({
        summary: 'retrieve the current Solana version',
        description: `Returns the current Solana version running on the node`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getVersion,
        type: String
    })
    async getVersion(
        @Query('network') network: string) {
        return this.solOnChainService.getVersion(network);
    }

    @Get('voteAccounts/:votePublickey') // 01_48
    @ApiOperation({
        summary: 'retrieve the account info and associated stake',
        description: `Returns the account info and associated stake for all the voting accounts in the current bank.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'votePublickey',
        type: 'string',
        required: true,
        description: 'Only return results for this validator vote address (base-58 encoded)'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getVoteAccounts,
        type: String
    })
    async getVoteAccounts(
        @Query('network') network: string,
        @Param('votePublickey') votePublickey: string) {
        return this.solOnChainService.getVoteAccounts(network, votePublickey);
    }

    @Get('isBlockhashValid/:publicKey') // 01_49
    @ApiOperation({
        summary: 'retrieve whether a blockhash is still valid or not',
        description: `Returns whether a blockhash is still valid or not`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'the blockhash of the block to evaluate, as base-58 encoded string'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.getIsBlockhashValid,
        type: String
    })
    async getIsBlockhashValid(
        @Query('network') network: string,
        @Param('publicKey') publicKey: string) {
        return this.solOnChainService.getIsBlockhashValid(network, publicKey);
    }

    @Get('minimumLedgerSlot') // 01_50
    @ApiOperation({
        summary: 'retrieve the lowest slot',
        description: `Returns the lowest slot that the node has information about in its ledger.`
    })
    @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiOkResponse({
        description: OnChainSolResultDescription.getMinimumLedgerSlot,
        type: String
    })
    async getMinimumLedgerSlot(
        @Query('network') network: string) {
        return this.solOnChainService.getMinimumLedgerSlot(network);
    }

    @Get('requestAirdrop/:publicKey/:amount') // 01_51
    @ApiOperation({
        summary: 'requests an airdrop on devnet',
        description: `Requests an airdrop of lamports to a Pubkey`
    })
    // @ApiQuery({name: 'network', enum: NetworkSelector})
    @ApiParam({
        name: 'publicKey',
        type: 'string',
        required: true,
        description: 'Pubkey of account to receive lamports, as a base-58 encoded string'
    })
    @ApiParam({
        name: 'amount',
        type: 'string',
        required: true,
        description: 'lamports to airdrop, as a "u64"'
    })
    @ApiOkResponse({
        description: OnChainSolResultDescription.requestAirdrop,
        type: String
    })
    async requestAirdrop(
        @Param('publicKey') publicKey: string, 
        @Param('amount') amount: string) {
        return this.solOnChainService.requestAirdrop(publicKey, amount);
    }
}
