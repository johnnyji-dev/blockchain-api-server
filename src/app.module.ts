import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EthModule } from './eth/eth.module';
import { SolModule } from './sol/sol.module';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal: true,} ),
    EthModule,
    SolModule
  ],
  controllers: [AppController],
})
export class AppModule {}
