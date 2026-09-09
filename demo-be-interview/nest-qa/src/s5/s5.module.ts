import { Module } from '@nestjs/common';
import { S5Controller } from './s5.controller.js';

@Module({
  controllers: [S5Controller],
})
export class S5Module {}
