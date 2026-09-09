import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { S1Module } from './s1/s1.module.js';
import { S1MockModule } from './s1/s1-mock.module.js';
import { S2Module } from './s2/s2.module.js';
import { s2Middleware } from './s2/s2.middleware.js';
import { S3Module } from './s3/s3.module.js';
import { s3Middleware } from './s3/s3.middleware.js';
import { S4Module } from './s4/s4.module.js';

@Module({
  imports: [S1Module, S1MockModule, S2Module, S3Module, S4Module],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware [1] của demo S2 — chỉ áp cho path s2 (khớp cả /s2/boom).
    consumer.apply(s2Middleware).forRoutes('s2');
    // Middleware S3 — parse x-token gắn req.user, không chặn (áp cho path s3).
    consumer.apply(s3Middleware).forRoutes('s3');
  }
}
