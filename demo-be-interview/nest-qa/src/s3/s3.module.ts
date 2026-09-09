import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller.js';

@Module({
  controllers: [S3Controller],
})
export class S3Module {}
