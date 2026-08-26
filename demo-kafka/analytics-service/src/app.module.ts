import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [],
  controllers: [AnalyticsController],
  providers: [],
})
export class AppModule {}
