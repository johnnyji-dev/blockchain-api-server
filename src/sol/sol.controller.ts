import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SolService } from './sol.service';
import { SOLANA_ROUTE_PATH, SOLANA_SWAGGER_TAG } from './sol.constants';

@ApiTags(SOLANA_SWAGGER_TAG)
@Controller(SOLANA_ROUTE_PATH)
export class SolController {
    constructor(private readonly solService: SolService) { }

    @Get()
    @ApiOperation({
        summary: 'Powerful for developers. Fast for everyone.',
        description: 'Bring blockchain to the people. Solana supports experiences for power users, new consumers, and everyone in between.'
    })
    home(): string {
        return 'Welcome To SOL page!'
    }



}
