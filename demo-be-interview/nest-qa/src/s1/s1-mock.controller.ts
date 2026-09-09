import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service.js';

// Consumer GIỐNG HỆT S1Controller — cũng chỉ inject PriceService theo type.
// Giá trả về khác nhau hoàn toàn do module đăng ký provider nào (useValue mock).
@Controller('s1-mock')
export class S1MockController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice() {
    return { price: this.priceService.getPrice(), from: 'useValue mock' };
  }
}
