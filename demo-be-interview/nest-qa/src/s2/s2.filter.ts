import { Catch } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

// Exception filter scope controller (gắn @UseFilters ở S2Controller) —
// chốt chặn CUỐI của lifecycle: handler ném Error thì mọi lớp "đường về"
// bị bỏ qua, lỗi rơi thẳng về đây. @Catch() để trống = bắt mọi exception.
@Catch()
export class S2Filter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.log('[F] Filter bắt lỗi');
    const res = host.switchToHttp().getResponse<Response>();
    res.status(500).json({ ok: false, error: exception.message });
  }
}
