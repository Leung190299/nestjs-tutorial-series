import { Module } from '@nestjs/common';
import { S1Module } from './s1/s1.module.js';
import { S1MockModule } from './s1/s1-mock.module.js';

@Module({
  imports: [S1Module, S1MockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
