import { Module } from '@nestjs/common';
import { S4Controller } from './s4.controller.js';

@Module({
  controllers: [S4Controller],
})
export class S4Module {}
