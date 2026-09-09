import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto.js';

// ValidationPipe scope controller: Nest chèn pipe NGAY TRƯỚC khi method được
// gọi — body sai là pipe ném exception → 400, handler KHÔNG BAO GIỜ chạy.
// whitelist: true → gọt sạch mọi property không có decorator (field lạ không lọt).
// transform: true → body thành instance CreateOrderDto thật.
@Controller('s4')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class S4Controller {
  // POST /s4 — vào được đến đây nghĩa là body ĐÃ hợp lệ và ĐÃ được gọt sạch.
  @Post()
  create(@Body() body: CreateOrderDto) {
    return { ok: true, order: body };
  }
}
