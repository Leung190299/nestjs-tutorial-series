import { Module } from '@nestjs/common';
import { PromosController } from './promos.controller.js';

@Module({
  imports: [],
  controllers: [PromosController],
  providers: [],
})
export class AppModule {}
