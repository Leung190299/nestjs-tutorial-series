import { Module } from '@nestjs/common';
import { S2Controller } from './s2.controller.js';

@Module({
  controllers: [S2Controller],
})
export class S2Module {}
