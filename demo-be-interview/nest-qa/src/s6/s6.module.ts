import { Module } from '@nestjs/common';
import { S6Controller } from './s6.controller.js';

@Module({
  controllers: [S6Controller],
})
export class S6Module {}
