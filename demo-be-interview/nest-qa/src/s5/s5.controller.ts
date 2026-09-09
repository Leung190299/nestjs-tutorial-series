import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { WrapInterceptor } from './wrap.interceptor.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Controller('s5')
export class S5Controller {
  // GET /s5 — có interceptor: response bị bọc {ok,data,tookMs} + header X-Response-Time.
  // Handler giả lập việc nặng 120ms → tookMs kỳ vọng ~12x ms.
  @Get()
  @UseInterceptors(WrapInterceptor)
  async list() {
    await delay(120);
    return { items: [1, 2, 3] };
  }

  // GET /s5/raw — ĐỐI CHỨNG: cùng data, cùng delay, KHÔNG interceptor
  // → body trần, không header X-Response-Time.
  @Get('raw')
  async raw() {
    await delay(120);
    return { items: [1, 2, 3] };
  }
}
