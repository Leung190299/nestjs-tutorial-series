import { Module } from '@nestjs/common';
import { PriceService } from './price.service.js';
import { S1MockController } from './s1-mock.controller.js';

// Swap implementation KHÔNG sửa consumer: cùng token PriceService,
// nhưng module này đưa object thường qua useValue → constructor class thật
// KHÔNG BAO GIỜ chạy cho nhánh mock.
@Module({
  controllers: [S1MockController],
  providers: [{ provide: PriceService, useValue: { getPrice: () => 1 } }],
})
export class S1MockModule {}
