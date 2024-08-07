import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('home')
@ApiTags('server')
export class AppController {
  @Get()
  home(): string {
    return 'Welcome To BlockChain API Server!'
  }
}
