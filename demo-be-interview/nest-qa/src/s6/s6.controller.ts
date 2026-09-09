import { Controller, Get, NotFoundException, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

// Filter gắn scope CONTROLLER (@UseFilters) — KHÔNG dùng APP_FILTER global
// để không đụng hành vi lỗi của các demo S1–S5 trong cùng app.
@Controller('s6')
@UseFilters(AllExceptionsFilter)
export class S6Controller {
  // GET /s6/boom — lỗi THÔ (không phải HttpException):
  // mặc định Nest nuốt thành 500 "Internal server error"; qua filter → {code:'INTERNAL',...}.
  @Get('boom')
  boom() {
    throw new Error('db exploded');
  }

  // GET /s6/known — HttpException chủ động ném: filter giữ status 404 + message,
  // chỉ chuẩn hóa vỏ {code, message, path, timestamp}.
  @Get('known')
  known() {
    throw new NotFoundException('Không thấy đơn hàng #42');
  }
}
