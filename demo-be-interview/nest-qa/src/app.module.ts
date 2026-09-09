import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { S1Module } from './s1/s1.module.js';
import { S1MockModule } from './s1/s1-mock.module.js';
import { S2Module } from './s2/s2.module.js';
import { s2Middleware } from './s2/s2.middleware.js';

@Module({
  imports: [S1Module, S1MockModule, S2Module],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware [1] của demo S2 — chỉ áp cho path s2 (khớp cả /s2/boom).
    consumer.apply(s2Middleware).forRoutes('s2');
  }
}
