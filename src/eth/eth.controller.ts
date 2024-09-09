import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { EthService } from './eth.service';
import { ETHEREUM_ROUTE_PATH, ETHEREUM_SWAGGER_TAG } from './eth.constants';

@ApiTags(ETHEREUM_SWAGGER_TAG)
@Controller(ETHEREUM_ROUTE_PATH)
export class EthController {
    constructor(private readonly ethService: EthService) { }

    @Get()
    @ApiOperation({
        summary: 'Ethereum is a technology that\'s home to digital money, global payments, and applications.',
        description: 'The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It\'s open to everyone, wherever you are in the world – all you need is the internet.'
    })
    home(): string {
        return 'Welcome To ETH page!';
    }

    // @Get('latestBlockNumber')
    // @ApiOperation({
    //     summary: '최신 블록 번호 조회',
    //     description: '네트워크 상, 최신 블록 번호 값을 반환한다.'
    // })
    // @ApiOkResponse({
    //     description: 'Success',
    //     type: String
    // })
    // async getLatestBlockNumber() {
    //     return this.ethService.getLatestBlockNumber();
    // }

    // @Get('balance/:walletAddress')
    // @ApiOperation({
    //     summary: '잔고 조회',
    //     description: '대상 지갑 주소가 보유한 ETH 잔고를 조회한다.'
    // })
    // @ApiParam({
    //     name: 'walletAddress',
    //     type: 'string',
    //     required: true,
    //     description: '조회 대상 지갑 주소'
    // })
    // @ApiOkResponse({
    //     description: 'Success'
    // })
    // async getBalance(@Param('walletAddress') walletAddress: string): Promise<any> {
    //     return this.ethService.getBalance(walletAddress);
    // }

    // @Get('createWallet')
    // @ApiOperation({
    //     summary: 'wallet 생성',
    //     description: 'wallet을 생성한다.'
    // })
    // @ApiOkResponse({
    //     description: 'Success'
    // })
    // createWallet() {
    //     return this.ethService.createWallet();
    // }

    // @Get('feeData')
    // @ApiOperation({
    //     summary: '수수료 정보 조회',
    //     description: '네트워크 상, 수수료 정보를 조회하여 반환한다.'
    // })
    // @ApiOkResponse({
    //     description: 'Success',
    //     type: String
    // })
    // async getFeeData() {
    //     return this.ethService.getFeeData();
    // }

    // @Get('nonce/:walletAddress')
    // @ApiOperation({
    //     summary: 'nonce 조회',
    //     description: '대상 지갑 주소의 nonce(트랜잭션 카운트)를 조회한다.'
    // })
    // @ApiParam({
    //     name: 'walletAddress',
    //     type: 'string',
    //     required: false,
    //     description: '조회 대상 지갑 주소'
    // })
    // @ApiOkResponse({
    //     description: 'Success'
    // })
    // async getNonce(@Param('walletAddress') walletAddress: string): Promise<any> {
    //     return this.ethService.getNonce(walletAddress);
    // }

    // @Get('chainId')
    // @ApiOperation({
    //     summary: 'chainId 조회',
    //     description: '현재 Network의 chainId를 조회한다.'
    // })
    // @ApiOkResponse({
    //     description: 'Success'
    // })
    // async getChainId(): Promise<any> {
    //     return this.ethService.getChainId();
    // }

    // @Get('gasPrice')
    // @ApiOperation({
    //     summary: 'gasPrice 조회',
    //     description: '현재 Network의 gasPrice 조회한다.'
    // })
    // @ApiOkResponse({
    //     description: 'Success'
    // })
    // async getGasPrice(): Promise<any> {
    //     return this.ethService.getGasPrice();
    // }



    // @Post('signTx')
    // @ApiOperation({
    //     summary: 'sign transaction 생성',
    //     description: 'sign하기 전인 rawTransaction을 생성한다.'
    // })
    // @ApiBody({ type: BroadcastTxDto })
    // @ApiOkResponse({
    //     description: 'Success',
    //     type: BroadcastTxResponse
    // })
    // async sendTransferTransaction(@Body() signRequest: BroadcastTxDto): Promise<BroadcastTxResponse> {
    //     return this.ethService.sendTransferTransaction(signRequest.sendAddr, signRequest.recvAddr, signRequest.sendAmount, signRequest.privateKey);
    // }
}
