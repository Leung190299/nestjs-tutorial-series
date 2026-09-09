import { Module } from '@nestjs/common';
import { PriceService } from './price.service.js';
import { S1Controller } from './s1.controller.js';

@Module({
  controllers: [S1Controller],
  providers: [PriceService],
})
export class S1Module {}
