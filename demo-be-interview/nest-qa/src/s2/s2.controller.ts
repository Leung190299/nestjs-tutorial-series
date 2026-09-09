import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { S2Guard } from './s2.guard.js';
import { S2Interceptor } from './s2.interceptor.js';
import { S2Pipe } from './s2.pipe.js';
import { S2Filter } from './s2.filter.js';

// Mỗi lớp log 1 dòng đánh số — chuỗi log server chính là bằng chứng
// thứ tự lifecycle. Middleware [1] đăng ký ở AppModule (forRoutes 's2').
@Controller('s2')
@UseGuards(S2Guard)
@UseInterceptors(S2Interceptor)
@UseFilters(S2Filter)
export class S2Controller {
  // GET /s2?msg=hello → kỳ vọng log [1][2][3][4][H][5]
  @Get()
  lifecycle(@Query('msg', S2Pipe) msg?: string) {
    console.log('[H] Handler chạy');
    return { ok: true, msg: msg ?? null };
  }

  // GET /s2/boom → handler ném Error: chuỗi dừng ở [H], không có [5],
  // lỗi rơi về filter [F].
  @Get('boom')
  boom(@Query('msg', S2Pipe) _msg?: string): never {
    console.log('[H] Handler chạy — ném Error');
    throw new Error('boom giữa handler');
  }
}
