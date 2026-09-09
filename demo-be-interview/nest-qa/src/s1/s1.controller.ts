import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service.js';

// Controller KHÔNG tự `new PriceService()` — chỉ khai báo type ở constructor,
// IoC container của Nest resolve theo type và đưa instance vào.
@Controller('s1')
export class S1Controller {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice() {
    return { price: this.priceService.getPrice(), from: 'service thật' };
  }

  // Route 2 dùng CÙNG service — bằng chứng singleton: gọi /s1/again
  // không thấy dòng constructor mới trong log server.
  @Get('again')
  getPriceAgain() {
    return { price: this.priceService.getPrice(), from: 'service thật (again)' };
  }
}
